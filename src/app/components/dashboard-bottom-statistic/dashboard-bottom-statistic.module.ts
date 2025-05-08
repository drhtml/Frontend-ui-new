import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardBottomStatisticComponent } from './dashboard-bottom-statistic.component';
import { LineChartByMonthModule } from '../line-chart-by-month/line-chart-by-month.module';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { AverageVisitLineChartComponent } from './average-visit-line-chart/average-visit-line-chart.component';
import { LatestLeadsComponent } from './latest-leads/latest-leads.component';
import { TopCitiesPieChartComponent } from './top-cities-pie-chart/top-cities-pie-chart.component';

@NgModule({
  declarations: [
    DashboardBottomStatisticComponent,
    LatestLeadsComponent,
    TopCitiesPieChartComponent,
    AverageVisitLineChartComponent,
  ],
  exports: [DashboardBottomStatisticComponent],
  imports: [CommonModule, PieChartModule, LineChartByMonthModule],
})
export class DashboardBottomStatisticModule {}
