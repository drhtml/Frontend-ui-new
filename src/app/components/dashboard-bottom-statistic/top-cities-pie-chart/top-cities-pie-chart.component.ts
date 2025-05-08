import { Component, Input, OnInit } from '@angular/core';
import { IPieData } from '../../pie-chart/pie-chart.component';

@Component({
  selector: 'app-top-cities-pie-chart',
  templateUrl: './top-cities-pie-chart.component.html',
  styleUrls: ['./top-cities-pie-chart.component.scss']
})
export class TopCitiesPieChartComponent implements OnInit {
  @Input('data') data: IPieData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
