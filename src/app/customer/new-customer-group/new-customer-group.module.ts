import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCustomerGroupPageRoutingModule } from './new-customer-group-routing.module';

import { NewCustomerGroupPage } from './new-customer-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCustomerGroupPageRoutingModule
  ],
  declarations: [NewCustomerGroupPage]
})
export class NewCustomerGroupPageModule {}
