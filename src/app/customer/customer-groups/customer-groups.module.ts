import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerGroupsPageRoutingModule } from './customer-groups-routing.module';

import { CustomerGroupsPage } from './customer-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerGroupsPageRoutingModule
  ],
  declarations: [CustomerGroupsPage]
})
export class CustomerGroupsPageModule {}
