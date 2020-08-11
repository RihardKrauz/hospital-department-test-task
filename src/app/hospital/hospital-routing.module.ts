import {RouterModule, Routes} from '@angular/router';
import {DepartmentsComponent} from './pages/departments/departments.component';
import {EditDepartmentComponent} from './pages/edit-department/edit-department.component';
import {CreateDepartmentComponent} from './pages/create-department/create-department.component';
import {NgModule} from '@angular/core';
import {DepartmentListComponent} from '@hdm-hospital/pages/department-list/department-list.component';

const routes: Routes = [
  {path: 'departments', component: DepartmentsComponent, children: [
      {path: 'list', component: DepartmentListComponent},
      {path: 'edit/:departmentId', component: EditDepartmentComponent},
      {path: 'create', component: CreateDepartmentComponent},
      {path: '', redirectTo: 'list', pathMatch: 'full'},
    ]},
  {path: '', redirectTo: 'departments', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalRoutingModule { }
