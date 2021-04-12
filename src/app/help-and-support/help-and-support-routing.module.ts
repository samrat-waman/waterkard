import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpAndSupportComponent } from './help-and-support/help-and-support.component';

const routes: Routes = [
  {
    path: '',
    component: HelpAndSupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpAndSupportRoutingModule { }
