import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiComponent } from './kpi.component';
import { ButtonModule } from '../button/button.module';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [KpiComponent],
  exports: [KpiComponent],
  imports: [CommonModule, ButtonModule, MatGridListModule],
})
export class KpiModule {}
