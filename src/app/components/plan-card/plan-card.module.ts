import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanCardComponent } from './plan-card.component';
import { ButtonModule } from '../button/button.module';
import { RadiosModule } from '../radios/radios.module';

@NgModule({
  declarations: [PlanCardComponent],
  exports: [PlanCardComponent],
  imports: [CommonModule, ButtonModule, RadiosModule],
})
export class PlanCardModule {}
