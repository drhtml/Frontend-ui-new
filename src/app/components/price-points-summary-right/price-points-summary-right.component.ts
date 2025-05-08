import { Component, Input, OnInit } from '@angular/core';
import { IPricePointSummary } from 'src/app/interfaces/IPricePointSummary';

@Component({
  selector: 'app-price-points-summary-right',
  templateUrl: './price-points-summary-right.component.html',
  styleUrls: ['./price-points-summary-right.component.scss']
})
export class PricePointsSummaryRightComponent implements OnInit {
  @Input() datas: IPricePointSummary[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
