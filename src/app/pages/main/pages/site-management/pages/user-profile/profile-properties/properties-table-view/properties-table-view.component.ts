import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IProperty } from 'src/app/interfaces/IProperty';
import { IColumnConfig, ISortObject } from 'src/app/interfaces/ITableConfig';

const desktopColumnConfigs: IColumnConfig[] = [
  {
    key: 'name',
    title: 'Property',
    type: 'text',
  },
  {
    key: 'location',
    title: 'Location',
    type: 'text',
  },
  {
    key: 'leads',
    title: 'Leads',
    type: 'text',
  },
  {
    key: 'evaluationStatus',
    title: 'Evaluation Status',
    type: 'evaluation status',
  },
  {
    key: 'bestPricePoint',
    title: 'Best price point',
    type: 'text',
  },
  {
    key: 'action',
    title: 'Actions',
    type: 'actions',
    actions: [
      {
        type: 'view',
      },
      {
        type: 'edit',
      },
      {
        type: 'delete',
      },
    ],
  },
];

@Component({
  selector: 'app-properties-table-view',
  templateUrl: './properties-table-view.component.html',
  styleUrls: ['./properties-table-view.component.scss'],
})
export class PropertiesTableViewComponent implements OnInit {
  @Input() tableDatas: IProperty[] = [];
  @Input() sortable?: ISortObject;
  displayedColumns: IColumnConfig[] = _.cloneDeep(desktopColumnConfigs).map(
    (item) => {
      if (item.key === 'action' && item.actions) {
        item.actions[0].action = this.viewData.bind(this);
        item.actions[1].action = this.editData.bind(this);
        item.actions[2].action = this.removeData.bind(this);
      }
      return item;
    }
  );

  constructor() {}

  ngOnInit(): void {}

  removeData(item: any): void {}

  viewData(item: any): void {}

  editData(item: any): void {}
}
