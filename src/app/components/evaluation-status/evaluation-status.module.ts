import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationStatusComponent } from './evaluation-status.component';

@NgModule({
  declarations: [EvaluationStatusComponent],
  exports: [EvaluationStatusComponent],
  imports: [CommonModule],
})
export class EvaluationStatusModule {}
