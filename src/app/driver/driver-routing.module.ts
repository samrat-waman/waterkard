import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { DriverListComponent } from './driver-list/driver-list.component';

const routes: Routes = [
  {
    path: '',
    component: DriverListComponent
  },
  {
    path: 'add-driver',
    component: AddDriverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
