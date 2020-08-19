import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CustomField} from '@hdm-hospital/models/custom-field';
import {NotificationService} from '@hdm-hospital/services/notification/notification.service';

@Component({
    selector: 'hdm-department-custom-field-modal',
    templateUrl: './department-custom-field-modal.component.html',
    styleUrls: ['./department-custom-field-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentCustomFieldModalComponent {

    constructor(
        public dialogRef: MatDialogRef<DepartmentCustomFieldModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CustomField<string>,
        private notificationService: NotificationService,
    ) {
    }

    closeClick(e: Event): void {
        e.preventDefault();
        this.dialogRef.close();
    }

    addField(e: Event): void {
        e.preventDefault();
        if (!this.data.name) {
            this.notificationService.showErrorMessage('Name is required');
        } else {
            this.dialogRef.close(this.data.name);
        }
    }

}
