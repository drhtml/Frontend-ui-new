import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IViewAsType } from 'src/app/components/view-as-toggle/view-as-toggle.component';
import { IOptionField } from 'src/app/interfaces/IOptionField';
import { IPricePointSummary } from 'src/app/interfaces/IPricePointSummary';
import { PricePointListComponent } from './price-point-list/price-point-list.component';

@Component({
  selector: 'app-price-point-container',
  templateUrl: './price-point-container.component.html',
  styleUrls: ['./price-point-container.component.scss'],
})
export class PricePointContainerComponent implements OnInit {
  @Input() datas: IPricePointSummary[] = [];
  sortBy: IOptionField[] = [
    {
      label: 'Best to Lowest',
      key: 'Best to Lowest',
    },
  ];
  sortByFormControl: FormControl = new FormControl();
  viewAs: IViewAsType = 'list';
  @ViewChild('listPricePoint') pricePointListRef?: PricePointListComponent;

  constructor() {}

  ngOnInit(): void {}

  doExpandAll(): void {
    this.pricePointListRef?.doExpandAll();
  }
}
