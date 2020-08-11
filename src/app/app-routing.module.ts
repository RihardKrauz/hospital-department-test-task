import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'hospital', loadChildren: () =>
      import(/* webpackChunkName: "hospital-module" */ './hospital/hospital.module').then(m => m.HospitalModule),},
  {path: '**', redirectTo: 'hospital'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
