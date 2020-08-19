import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
    template: `
        <div class="notification-body">
            <mat-icon class="icon">{{data.icon}}</mat-icon>
            <span class="notification-text" >
                {{data.text}}
            </span>
        </div>
    `,
    styles: [`
        .notification-body {
            display: flex;
            align-items: center;
            color: white;
        }

        .notification-text {
            margin-left: 14px;
        }

    `],
})
export class NotificationComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {text: string, icon: string}) { }
}
