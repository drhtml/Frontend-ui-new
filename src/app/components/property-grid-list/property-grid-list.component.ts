import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IProperty } from 'src/app/interfaces/IProperty';

const ELEMENT_DATA: IProperty[] = [
  {
    id: '1',
    name: 'ABC Property',
    dateAdded: 'Apr 18, 2022',
    location: 'Dallas',
    type: 'House',
    evaluationStatus: 'Not Started',
    value: '',
    soldPrice: '',
    spread: '',
  },
];
@Component({
  selector: 'app-property-grid-list',
  templateUrl: './property-grid-list.component.html',
  styleUrls: ['./property-grid-list.component.scss'],
})
export class PropertyGridListComponent implements OnInit {
  @Output() deleteThis = new EventEmitter<string>();
  @Input() tableDatas: IProperty[] = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
