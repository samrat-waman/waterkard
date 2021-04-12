import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDisepensersComponent } from './add-disepensers/add-disepensers.component';
import { DispencersListComponent } from './dispencers-list/dispencers-list.component';

const routes: Routes = [
  {
    path: '',
    component: DispencersListComponent
  },
  {
    path:'add-despencer',
    component: AddDisepensersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispensersRoutingModule { }
