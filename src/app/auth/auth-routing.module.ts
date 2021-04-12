import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverLoginComponent } from './driver-login/driver-login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { VendorLoginComponent } from './vendor-login/vendor-login.component';

const routes: Routes = [
  {
    path : '',
    component: MainComponent
    
  },
  {
    path: 'vendor-login',
    component: VendorLoginComponent
  },
  {
    path: 'driver-login',
    component: VendorLoginComponent
  },
  {
    path : 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
