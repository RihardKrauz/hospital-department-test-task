import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CustomField} from '@hdm-hospital/models/custom-field';

@Component({
    selector: 'hdm-department-custom-field-modal',
    templateUrl: './department-custom-field-modal.component.html',
    styleUrls: ['./department-custom-field-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentCustomFieldModalComponent {

    constructor(
        public dialogRef: MatDialogRef<DepartmentCustomFieldModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CustomField<string>) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
