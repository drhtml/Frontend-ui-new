import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepTwoFormComponent } from './step-two-form.component';
import { SchoolsComponent } from './schools/schools.component';
import { PriceEvolutionComponent } from './price-evolution/price-evolution.component';
import { CheckboxGroupModule } from '../checkbox-group/checkbox-group.module';
import { InputFieldModule } from '../input-field/input-field.module';
import { ButtonModule } from '../button/button.module';
import { GradeSliderModule } from '../grade-slider/grade-slider.module';
import { DividerModule } from '../divider/divider.module';

@NgModule({
  declarations: [
    StepTwoFormComponent,
    SchoolsComponent,
    PriceEvolutionComponent,
  ],
  exports: [StepTwoFormComponent],
  imports: [
    CommonModule,
    CheckboxGroupModule,
    InputFieldModule,
    ButtonModule,
    GradeSliderModule,
    DividerModule,
  ],
})
export class StepTwoFormModule {}
