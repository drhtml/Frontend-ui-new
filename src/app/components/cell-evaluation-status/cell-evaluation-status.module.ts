import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellEvaluationStatusComponent } from './cell-evaluation-status.component';

@NgModule({
  declarations: [CellEvaluationStatusComponent],
  exports: [CellEvaluationStatusComponent],
  imports: [CommonModule],
})
export class CellEvaluationStatusModule {}
