import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileVerificationRoutingModule } from './profile-verification-routing.module';
import { ProfileVerificationComponent } from './profile-verification/profile-verification.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProfileVerificationComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ProfileVerificationRoutingModule
  ]
})
export class ProfileVerificationModule { }
