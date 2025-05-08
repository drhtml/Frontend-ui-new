import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneFormComponent } from './step-one-form.component';
import { DragAndDropFieldModule } from '../drag-and-drop-field/drag-and-drop-field.module';
import { RadiosModule } from '../radios/radios.module';
import { InputFieldModule } from '../input-field/input-field.module';
import { DividerModule } from '../divider/divider.module';
import { ButtonModule } from '../button/button.module';
import { TextareaFieldModule } from '../textarea-field/textarea-field.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { CheckboxGroupModule } from '../checkbox-group/checkbox-group.module';
import { SelectFieldModule } from '../select-field/select-field.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { PlanCardModule } from '../plan-card/plan-card.module';

@NgModule({
  declarations: [StepOneFormComponent],
  exports: [StepOneFormComponent],
  imports: [
    CommonModule,
    DragAndDropFieldModule,
    RadiosModule,
    InputFieldModule,
    DividerModule,
    ButtonModule,
    TextareaFieldModule,
    MatGridListModule,
    CheckboxGroupModule,
    SelectFieldModule,
    CheckboxModule,
    PlanCardModule,
  ],
})
export class StepOneFormModule {}
