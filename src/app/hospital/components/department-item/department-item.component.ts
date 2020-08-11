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
import {FormBuilder, FormGroup} from '@angular/forms';
import {Department} from '@hdm-hospital/models/department';
import {DepartmentService} from '@hdm-hospital/services/department/department.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'hdm-department-item',
    templateUrl: './department-item.component.html',
    styleUrls: ['./department-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentItemComponent implements OnInit, OnChanges, OnDestroy {
    private subs = new Subscription();
    public departmentForm: FormGroup;

    @Input() item: Department;
    @Input() editMode: boolean;

    constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
        this.initForm();

        if (!this.editMode) {
            this.generateUid();
        }

        if (this.item) {
            this.departmentForm.setValue(this.item);
        }

    }

    ngOnChanges({item}: SimpleChanges): void {

    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public saveItem(e: Event): void {
        e.preventDefault();
        this.subs.add(this.departmentService
            .editDepartment(this.departmentForm.controls.id.value, this.departmentForm.value)
            .subscribe()); // todo: notify success / error handling / loader
    }

    public createItem(e: Event): void {
        e.preventDefault();
        this.subs.add(this.departmentService
            .addDepartment(this.departmentForm.value)
            .subscribe()); // todo: notify success / error handling / loader
    }

    private initForm(): void {
        this.departmentForm = this.fb.group({
            info: this.fb.group({
                name: [''],
                apiKey: ['']
            }),
            contactPerson: this.fb.group({
                name: [''],
                email: [''],
                telephone: ['']
            }),
            id: ['']
        });
    }

    private generateUid(): void {
        this.departmentForm.controls.id.setValue(Date.now());
    }



}
