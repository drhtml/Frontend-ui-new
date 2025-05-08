import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPropertyComponent } from './new-property.component';
import { NewPropertyRoutingModule } from './new-property-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { BottomLinksModule } from 'src/app/components/bottom-links/bottom-links.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { CheckboxGroupModule } from 'src/app/components/checkbox-group/checkbox-group.module';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { DeleteThisPropertyDialogModule } from 'src/app/components/confirmation-dialog/confirmation-dialog.module';
import { DividerModule } from 'src/app/components/divider/divider.module';
import { GradeSliderModule } from 'src/app/components/grade-slider/grade-slider.module';
import { InputFieldModule } from 'src/app/components/input-field/input-field.module';
import { MonthlyPaymentModule } from 'src/app/components/monthly-payment/monthly-payment.module';
import { SelectFieldModule } from 'src/app/components/select-field/select-field.module';
import { StepReviewFormModule } from 'src/app/components/step-review-form/step-review-form.module';
import { CompleteTheseStepsRightComponent } from './components/complete-these-steps-right/complete-these-steps-right.component';
import { PropertyEvaluationDialogComponent } from './components/property-evaluation-dialog/property-evaluation-dialog.component';
import { StepFourFormComponent } from './components/step-four-form/step-four-form.component';
import { StepThreeFormComponent } from './components/step-three-form/step-three-form.component';
import { StepEditReviewFormModule } from 'src/app/components/step-edit-review-form/step-edit-review-form.module';
import { StepOneFormModule } from 'src/app/components/step-one-form/step-one-form.module';
import { DeleteThisPropertyRightModule } from 'src/app/components/delete-this-property-right/delete-this-property-right.module';
import { PlanCardModule } from 'src/app/components/plan-card/plan-card.module';
import { StepTwoFormModule } from 'src/app/components/step-two-form/step-two-form.module';

@NgModule({
  declarations: [
    NewPropertyComponent,
    CompleteTheseStepsRightComponent,
    StepThreeFormComponent,
    StepFourFormComponent,
    PropertyEvaluationDialogComponent,
  ],
  imports: [
    CommonModule,
    NewPropertyRoutingModule,
    BottomLinksModule,
    DividerModule,
    ButtonModule,
    MatGridListModule,
    InputFieldModule,
    SelectFieldModule,
    CheckboxGroupModule,
    CheckboxModule,
    GradeSliderModule,
    MatExpansionModule,
    StepReviewFormModule,
    MonthlyPaymentModule,
    DeleteThisPropertyDialogModule,
    StepEditReviewFormModule,
    StepOneFormModule,
    DeleteThisPropertyRightModule,
    PlanCardModule,
    StepTwoFormModule,
  ],
})
export class NewPropertyModule {}
