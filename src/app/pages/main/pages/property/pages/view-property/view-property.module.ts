import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPropertyComponent } from './view-property.component';
import { ViewPropertyRoutingModule } from './view-property-routing.module';
import { StepReviewFormModule } from 'src/app/components/step-review-form/step-review-form.module';
import { BottomLinksModule } from 'src/app/components/bottom-links/bottom-links.module';

@NgModule({
  declarations: [ViewPropertyComponent],
  imports: [
    CommonModule,
    ViewPropertyRoutingModule,
    StepReviewFormModule,
    BottomLinksModule,
  ],
})
export class ViewPropertyModule {}
