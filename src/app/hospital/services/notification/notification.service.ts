import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private snackConfig = {duration: 4000};

    constructor(private snackBar: MatSnackBar) {
    }

    public showSuccessMessage(text: string): void {
        this.snackBar.open(text, null, this.snackConfig);
    }

    public showErrorMessage(text: string): void {
        this.snackBar.open(text, null, this.snackConfig);
    }
}
