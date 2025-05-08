import { Component, Input, OnInit } from '@angular/core';
import { IPricePointSummary } from 'src/app/interfaces/IPricePointSummary';

@Component({
  selector: 'app-price-points-summary',
  templateUrl: './price-points-summary.component.html',
  styleUrls: ['./price-points-summary.component.scss'],
})
export class PricePointsSummaryComponent implements OnInit {
  @Input() datas: IPricePointSummary[] = [];

  constructor() {}

  ngOnInit(): void {}
}
