import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AssignCustomerListComponent } from './assign-customer-list/assign-customer-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
  {
    path: 'assign-customer',
    component: AssignCustomerListComponent
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent
  },
  {
    path: 'customer-groups',
    loadChildren: () => import('./customer-groups/customer-groups.module').then(m => m.CustomerGroupsPageModule)
  },
  {
    path: 'single-customer-group',
    loadChildren: () => import('./single-customer-group/single-customer-group.module').then(m => m.SingleCustomerGroupPageModule)
  },
  {
    path: 'new-customer-group',
    loadChildren: () => import('./new-customer-group/new-customer-group.module').then(m => m.NewCustomerGroupPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
