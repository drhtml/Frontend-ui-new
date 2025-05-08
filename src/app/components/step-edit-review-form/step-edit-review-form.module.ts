import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditReviewPropertyDetailsComponent } from './edit-review-property-details/edit-review-property-details.component';
import { StepEditReviewFormComponent } from './step-edit-review-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonModule } from '../button/button.module';
import { DividerModule } from '../divider/divider.module';
import { StepOneFormModule } from '../step-one-form/step-one-form.module';
import { StepTwoFormModule } from '../step-two-form/step-two-form.module';
import { EditInteriorDetailsComponent } from './edit-interior-details/edit-interior-details.component';

@NgModule({
  declarations: [
    StepEditReviewFormComponent,
    EditReviewPropertyDetailsComponent,
    EditInteriorDetailsComponent,
  ],
  exports: [StepEditReviewFormComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    ButtonModule,
    DividerModule,
    StepOneFormModule,
    StepTwoFormModule,
  ],
})
export class StepEditReviewFormModule {}
