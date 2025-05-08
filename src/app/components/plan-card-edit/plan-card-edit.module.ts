import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanCardEditComponent } from './plan-card-edit.component';
import { InputFieldModule } from '../input-field/input-field.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [PlanCardEditComponent],
  exports: [PlanCardEditComponent],
  imports: [CommonModule, InputFieldModule, ButtonModule],
})
export class PlanCardEditModule {}
