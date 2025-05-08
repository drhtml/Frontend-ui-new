import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { LineChartComponent } from 'src/app/components/line-chart/line-chart.component';
import { IResponseProperty } from 'src/app/interfaces/backendResponse/IResponseProperty';

@Component({
  selector: 'app-review-price-evolution',
  templateUrl: './review-price-evolution.component.html',
  styleUrls: ['./review-price-evolution.component.scss'],
})
export class ReviewPriceEvolutionComponent implements OnInit, OnChanges {
  @ViewChild('lineChart') chartRef?: LineChartComponent;
  public data: { value: number; year: number }[] = [];
  @Input() propertyData?: IResponseProperty;

  constructor() {}

  ngOnInit(): void {}

  reloadPriceEvolutionChart(): void {
    if (this.data.length) {
      this.chartRef?.drawChart();
    }
  }

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.data = (this.propertyData.propertyPriceEvaluation || []).map((item) => {
        return {
          year: item.year,
          value: item.price,
        };
      });
    }
  }
}
