import {Component, Inject, Injectable} from '@angular/core';
import {MatSnackBar, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import {NotificationComponent} from '@hdm-hospital/components/notification/notification.component';



@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private snackConfig = { duration: 4000 };

    constructor(private snackBar: MatSnackBar) {
    }

    public showSuccessMessage(text: string): void {
        this.snackBar.openFromComponent(NotificationComponent,  {
            ...this.snackConfig, panelClass: 'notification-success' , data: { text, icon: 'check' }
        });
    }

    public showErrorMessage(text: string): void {
        this.snackBar.openFromComponent(NotificationComponent,  {
            ...this.snackConfig, panelClass: 'notification-error', data: { text, icon: 'error' }
        });
    }
}
