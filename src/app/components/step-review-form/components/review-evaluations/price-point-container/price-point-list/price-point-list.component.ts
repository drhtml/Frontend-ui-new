import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import * as _ from 'lodash';
import { IPricePoint } from 'src/app/interfaces/IPricePoint';
import { IPricePointSummary } from 'src/app/interfaces/IPricePointSummary';
import { IColumnConfig } from 'src/app/interfaces/ITableConfig';

const desktopColumnConfigs: IColumnConfig[] = [
  {
    key: 'lead',
    title: 'Lead',
    type: 'text',
    isSticky: true,
  },
  {
    key: 'visits',
    title: '# Visits',
    type: 'text',
  },
  {
    key: 'engagement',
    title: 'Engagement',
    type: 'text',
  },
  {
    key: 'location',
    title: 'Location',
    type: 'text',
  },
  {
    key: 'sessionDuration',
    title: 'Session Duration',
    type: 'text',
  },
  {
    key: 'repeatVisit',
    title: 'Repeat Visit',
    type: 'evaluation status',
  },
  {
    key: 'requestInfo',
    title: 'Request Info',
    type: 'evaluation status',
  },
];

const ELEMENT_DATA: IPricePoint[] = [
  {
    id: 1,
    lead: 'Lead 1',
    visits: 2,
    engagement: '40%',
    location: 'Dallas',
    sessionDuration: '03:05',
    repeatVisit: 'Yes',
    requestInfo: 'Yes',
  },
  {
    id: 2,
    lead: 'Lead 2',
    visits: 2,
    engagement: '40%',
    location: 'Dallas',
    sessionDuration: '03:05',
    repeatVisit: 'Yes',
    requestInfo: 'No',
  },
  {
    id: 3,
    lead: 'Lead 3',
    visits: 2,
    engagement: '40%',
    location: 'Dallas',
    sessionDuration: '03:05',
    repeatVisit: 'Yes',
    requestInfo: 'Yes',
  },
  {
    id: 4,
    lead: 'Lead 4',
    visits: 2,
    engagement: '40%',
    location: 'Dallas',
    sessionDuration: '03:05',
    repeatVisit: 'Yes',
    requestInfo: 'Yes',
  },
  {
    id: 5,
    lead: 'Lead 5',
    visits: 2,
    engagement: '40%',
    location: 'Dallas',
    sessionDuration: '03:05',
    repeatVisit: 'Yes',
    requestInfo: 'Yes',
  },
  {
    id: 6,
    lead: 'Lead 6',
    visits: 2,
    engagement: '40%',
    location: 'Dallas',
    sessionDuration: '03:05',
    repeatVisit: 'Yes',
    requestInfo: 'Yes',
  },
  {
    id: 7,
    lead: 'Lead 7',
    visits: 2,
    engagement: '40%',
    location: 'Dallas',
    sessionDuration: '03:05',
    repeatVisit: 'Yes',
    requestInfo: 'Yes',
  },
  {
    id: 8,
    lead: 'Lead 8',
    visits: 2,
    engagement: '40%',
    location: 'Dallas',
    sessionDuration: '03:05',
    repeatVisit: 'Yes',
    requestInfo: 'Yes',
  },
  {
    id: 9,
    lead: 'Lead 9',
    visits: 2,
    engagement: '40%',
    location: 'Dallas',
    sessionDuration: '03:05',
    repeatVisit: 'Yes',
    requestInfo: 'Yes',
  },
  {
    id: 10,
    lead: 'Lead 10',
    visits: 2,
    engagement: '40%',
    location: 'Dallas',
    sessionDuration: '03:05',
    repeatVisit: 'Yes',
    requestInfo: 'Yes',
  },
];

@Component({
  selector: 'app-price-point-list',
  templateUrl: './price-point-list.component.html',
  styleUrls: ['./price-point-list.component.scss'],
})
export class PricePointListComponent implements OnInit {
  @Input() datas: IPricePointSummary[] = [];
  @Input() tableDatas: IPricePoint[] = ELEMENT_DATA;
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  displayedColumns: IColumnConfig[] = _.cloneDeep(desktopColumnConfigs);

  constructor() {}

  ngOnInit(): void {}

  doExpandAll(): void {
    this.accordion?.openAll();
  }
}
