import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeSliderComponent } from './grade-slider.component';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GradeSliderComponent],
  exports: [GradeSliderComponent],
  imports: [CommonModule, MatSliderModule, ReactiveFormsModule],
})
export class GradeSliderModule {}
