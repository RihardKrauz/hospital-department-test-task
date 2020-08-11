import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiKitModule} from '../ui-kit/ui-kit.module';
import {HospitalRoutingModule} from './hospital-routing.module';
import {CreateDepartmentComponent} from './pages/create-department/create-department.component';
import {DepartmentsComponent} from './pages/departments/departments.component';
import {EditDepartmentComponent} from './pages/edit-department/edit-department.component';
import {DepartmentListComponent} from './pages/department-list/department-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DepartmentTileComponent } from './components/department-tile/department-tile.component';
import { DepartmentItemComponent } from './components/department-item/department-item.component';

@NgModule({
    declarations: [
        CreateDepartmentComponent,
        DepartmentsComponent,
        EditDepartmentComponent,
        DepartmentListComponent,
        DepartmentTileComponent,
        DepartmentItemComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HospitalRoutingModule,
        UiKitModule,
    ],
    exports: []
})
export class HospitalModule {
}