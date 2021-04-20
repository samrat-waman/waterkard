import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';


@NgModule({
  declarations: [MyProfileComponent, DriverProfileComponent],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class MyProfileModule { }
