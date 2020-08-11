import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    OnChanges,
    SimpleChanges,
    Input,
    ChangeDetectorRef,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Department} from '@hdm-hospital/models/department';
import {DepartmentService} from '@hdm-hospital/services/department/department.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import {NotificationService} from '@hdm-hospital/services/notification/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {DepartmentCustomFieldModalComponent} from '@hdm-hospital/components/department-custom-field-modal/department-custom-field-modal.component';
import {CustomFieldsCollection} from '@hdm-hospital/models/custom-fields-collection';

@Component({
    selector: 'hdm-department-item',
    templateUrl: './department-item.component.html',
    styleUrls: ['./department-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentItemComponent implements OnInit, OnDestroy {
    private subs = new Subscription();
    public departmentForm: FormGroup;
    public isLoading: boolean;

    @Input() item: Department;
    @Input() editMode: boolean;

    constructor(private fb: FormBuilder,
                private cdr: ChangeDetectorRef,
                private departmentService: DepartmentService,
                private router: Router,
                private notificationService: NotificationService,
                private dialog: MatDialog
    ) {
    }

    public get infoCustomFields(): FormArray {
        return this.departmentForm.get('info').get('extraFields') as FormArray;
    }

    public get contactCustomFields(): FormArray {
        return this.departmentForm.get('contactPerson').get('extraFields') as FormArray;
    }

    ngOnInit(): void {
        this.initForm();

        if (!this.editMode) {
            this.generateUid();
        }

        if (this.item) {
            this.generateDynamicArrayFields(this.item);

            this.departmentForm.setValue(this.item);
        }

    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public saveItem(e: Event): void {
        e.preventDefault();
        this.isLoading = true;
        this.subs.add(this.departmentService
            .editDepartment(this.departmentForm.controls.id.value, this.departmentForm.value)
            .pipe(
                finalize(() => this.isLoading = false)
            )
            .subscribe(() => {
                this.notificationService.showSuccessMessage('Department has been successfully saved');
            }, (err) => {
                this.notificationService.showErrorMessage(`Error on saving department: ${err}`);
            }));
    }

    public createItem(e: Event): void {
        e.preventDefault();
        this.isLoading = true;
        this.subs.add(this.departmentService
            .addDepartment(this.departmentForm.value)
            .pipe(
                finalize(() => this.isLoading = false)
            )
            .subscribe(() => {
                this.notificationService.showSuccessMessage('Department has been successfully created');
                this.navigateToList();
            }, (err) => {
                this.notificationService.showErrorMessage(`Error on create department: ${err}`);
            }));
    }

    public toList(e: Event): void {
        e.preventDefault();
        this.navigateToList();
    }

    public addNewCustomFieldOnForm(e: Event, parentControlName: string): void {
        const dialogRef = this.dialog.open(DepartmentCustomFieldModalComponent, {
            width: '400px',
            data: {name: ''}
        });

        dialogRef.afterClosed().subscribe(name => {
            if (!name) { return; }

            this.addCustomField(parentControlName, name);
            this.cdr.markForCheck();
        });
    }

    private addCustomField(parentControlName: string, defaultName: string = ''): void {
        const info = this.departmentForm.controls[parentControlName] as FormGroup;
        const container = info.controls.extraFields as FormArray;

        container.insert(container.length, this.fb.group({ name: [defaultName], value: ['']}));
    }

    private navigateToList(): void {
        this.router.navigate(['..', 'list']);
    }

    private initForm(): void {
        this.departmentForm = this.fb.group({
            info: this.fb.group({
                name: [''],
                apiKey: [''],
                extraFields: this.fb.array([])
            }),
            contactPerson: this.fb.group({
                name: [''],
                email: [''],
                telephone: [''],
                extraFields: this.fb.array([])
            }),
            id: ['']
        });
    }

    private generateUid(): void {
        this.departmentForm.controls.id.setValue(Date.now());
    }

    private generateDynamicArrayFields(item: Department): void {

        this.subs.add(this.departmentService.getCustomFields().subscribe(fieldsResult => {
            if (!fieldsResult.isOk) {
                console.error(fieldsResult.errorMessage);
                this.notificationService.showErrorMessage(fieldsResult.errorMessage);
                return;
            }

            const allCustomFields = fieldsResult.value;

            this.setCustomFieldsList(allCustomFields, 'info', item);
            this.setCustomFieldsList(allCustomFields, 'contactPerson', item);
        }));
    }

    private setCustomFieldsList(collection: CustomFieldsCollection, collectionType: keyof CustomFieldsCollection, item: Department): void {
        if (collection[collectionType] && collection[collectionType].length) {
            for (const fieldName of collection[collectionType]) {
                this.addCustomField(collectionType, fieldName);
                if (item[collectionType].extraFields.map(cf => cf.name).indexOf(fieldName) === -1) {
                    item[collectionType].extraFields.push({ name: fieldName, value: '' });
                }
            }
        }
    }

}
