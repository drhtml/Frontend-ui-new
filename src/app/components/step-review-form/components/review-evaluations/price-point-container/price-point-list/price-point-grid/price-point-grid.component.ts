import { Component, Input, OnInit } from '@angular/core';
import { IPricePoint } from 'src/app/interfaces/IPricePoint';

@Component({
  selector: 'app-price-point-grid',
  templateUrl: './price-point-grid.component.html',
  styleUrls: ['./price-point-grid.component.scss']
})
export class PricePointGridComponent implements OnInit {
  @Input() datas: IPricePoint[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
