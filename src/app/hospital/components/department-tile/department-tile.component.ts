import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Department} from '@hdm-hospital/models/department';
import {Router} from '@angular/router';
import {DepartmentService} from '@hdm-hospital/services/department/department.service';
import {Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {DepartmentCustomFieldModalComponent} from '@hdm-hospital/components/department-custom-field-modal/department-custom-field-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {RemoveConfirmationDialogComponent} from '@hdm-hospital/components/remove-confirmation-dialog/remove-confirmation-dialog.component';

@Component({
    selector: 'hdm-department-tile',
    templateUrl: './department-tile.component.html',
    styleUrls: ['./department-tile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentTileComponent implements OnInit, OnDestroy {
    private subs = new Subscription();
    public isLoading: boolean;

    @Input() item: Department;
    @Output() refreshContainer = new EventEmitter<void>();

    constructor(private router: Router, private departmentService: DepartmentService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public navigateForItem(id: string): void {
        this.router.navigate(['hospital', 'departments', 'edit', id]);
    }

    public showRemovalConfirmation(id: string): void {
        const dialogRef = this.dialog.open(RemoveConfirmationDialogComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteItem(id);
            }
        });
    }

    public deleteItem(id: string): void {
        this.isLoading = true;
        this.subs.add(this.departmentService
            .removeDepartmentById(id)
            .pipe(
                finalize(() => this.isLoading = false)
            )
            .subscribe(() => {
                this.refreshContainer.emit();
            }));
    }

}
