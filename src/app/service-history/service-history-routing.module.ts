import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceHistoryComponent } from './service-history/service-history.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceHistoryRoutingModule { }
