import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CustomField} from '@hdm-hospital/models/custom-field';

@Component({
    selector: 'hdm-remove-confirmation-dialog',
    templateUrl: './remove-confirmation-dialog.component.html',
    styleUrls: ['./remove-confirmation-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveConfirmationDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<RemoveConfirmationDialogComponent>) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
