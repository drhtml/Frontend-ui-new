import { Component, Input, OnInit } from '@angular/core';
import { ILineChartByMonthData } from '../../line-chart-by-month/line-chart-by-month.component';

@Component({
  selector: 'app-average-visit-line-chart',
  templateUrl: './average-visit-line-chart.component.html',
  styleUrls: ['./average-visit-line-chart.component.scss']
})
export class AverageVisitLineChartComponent implements OnInit {
  @Input() public data: ILineChartByMonthData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
