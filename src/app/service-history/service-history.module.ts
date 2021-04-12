import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceHistoryRoutingModule } from './service-history-routing.module';
import { IonicModule } from '@ionic/angular';
import { ServiceHistoryComponent } from './service-history/service-history.component';


@NgModule({
  declarations: [ServiceHistoryComponent],
  imports: [
    CommonModule,
    ServiceHistoryRoutingModule,
    IonicModule
  ]
})
export class ServiceHistoryModule { }
