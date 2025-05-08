import { Component, Input, OnInit } from '@angular/core';
import { IColumnAction, IColumnConfig } from 'src/app/interfaces/ITableConfig';

@Component({
  selector: 'app-cell-actions',
  templateUrl: './cell-actions.component.html',
  styleUrls: ['./cell-actions.component.scss'],
})
export class CellActionsComponent implements OnInit {
  @Input() columnConfig?: IColumnConfig;
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}

  get options(): IColumnAction[] {
    return this.columnConfig?.actions || [];
  }
}
