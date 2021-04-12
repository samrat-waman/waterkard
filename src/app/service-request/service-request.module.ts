import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRequestRoutingModule } from './service-request-routing.module';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ServiceRequestComponent],
  imports: [
    CommonModule,
    ServiceRequestRoutingModule,
    IonicModule
  ]
})
export class ServiceRequestModule { }
