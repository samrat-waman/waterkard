import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MyProfileComponent
  },
  {
    path: 'driver-profile',
    component: DriverProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }
