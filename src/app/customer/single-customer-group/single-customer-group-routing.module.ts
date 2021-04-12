import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleCustomerGroupPage } from './single-customer-group.page';

const routes: Routes = [
  {
    path: '',
    component: SingleCustomerGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleCustomerGroupPageRoutingModule {}
