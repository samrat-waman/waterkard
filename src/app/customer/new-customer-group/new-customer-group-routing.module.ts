import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCustomerGroupPage } from './new-customer-group.page';

const routes: Routes = [
  {
    path: '',
    component: NewCustomerGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCustomerGroupPageRoutingModule {}
