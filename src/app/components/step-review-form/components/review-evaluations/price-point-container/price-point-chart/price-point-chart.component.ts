import { Component, Input, OnInit } from '@angular/core';
import { IPricePointSummary } from 'src/app/interfaces/IPricePointSummary';

@Component({
  selector: 'app-price-point-chart',
  templateUrl: './price-point-chart.component.html',
  styleUrls: ['./price-point-chart.component.scss']
})
export class PricePointChartComponent implements OnInit {
  @Input() datas: IPricePointSummary[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
