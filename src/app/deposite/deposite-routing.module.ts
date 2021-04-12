import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositeListComponent } from './deposite-list/deposite-list.component';
import { EditDepositeComponent } from './edit-deposite/edit-deposite.component';

const routes: Routes = [
  {
    path: '',
    component: DepositeListComponent
  },
  {
    path: 'edit-deposite',
    component: EditDepositeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositeRoutingModule { }
