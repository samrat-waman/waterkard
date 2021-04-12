import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleCustomerGroupPageRoutingModule } from './single-customer-group-routing.module';

import { SingleCustomerGroupPage } from './single-customer-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleCustomerGroupPageRoutingModule
  ],
  declarations: [SingleCustomerGroupPage]
})
export class SingleCustomerGroupPageModule {}
