import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AssignCustomerListComponent } from './assign-customer-list/assign-customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerProductComponent } from './customer-product/customer-product.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
@NgModule({
  declarations: [AssignCustomerListComponent, AddCustomerComponent, CustomerProductComponent, CustomerListComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class CustomerModule { }
