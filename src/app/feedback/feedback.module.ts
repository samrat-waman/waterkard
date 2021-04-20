import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StarRatingModule } from 'ionic5-star-rating';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    IonicModule,
    StarRatingModule,
    FormsModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeedbackModule { }
