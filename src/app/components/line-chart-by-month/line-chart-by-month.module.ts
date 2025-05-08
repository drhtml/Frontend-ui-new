import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartByMonthComponent } from './line-chart-by-month.component';



@NgModule({
  declarations: [
    LineChartByMonthComponent
  ],
  exports: [
    LineChartByMonthComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LineChartByMonthModule { }
