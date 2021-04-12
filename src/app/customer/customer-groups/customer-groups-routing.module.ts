import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerGroupsPage } from './customer-groups.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerGroupsPageRoutingModule {}
