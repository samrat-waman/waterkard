import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    IonicModule
  ]
})
export class FeedbackModule { }
