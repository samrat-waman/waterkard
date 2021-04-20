import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileVerificationComponent } from './profile-verification/profile-verification.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileVerificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileVerificationRoutingModule { }
