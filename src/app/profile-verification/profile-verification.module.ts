import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileVerificationRoutingModule } from './profile-verification-routing.module';
import { ProfileVerificationComponent } from './profile-verification/profile-verification.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { VerificationStatusComponent } from './verification-status/verification-status.component';


@NgModule({
  declarations: [ProfileVerificationComponent, VerificationStatusComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ProfileVerificationRoutingModule
  ]
})
export class ProfileVerificationModule { }
