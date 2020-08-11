import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    exports: [
        MatInputModule,
        MatToolbarModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
    ]
})
export class UiKitModule {
}
