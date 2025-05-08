import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationSliderComponent } from './evaluation-slider.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [EvaluationSliderComponent],
  exports: [EvaluationSliderComponent],
  imports: [CommonModule, MatSliderModule, ReactiveFormsModule],
})
export class EvaluationSliderModule {}
