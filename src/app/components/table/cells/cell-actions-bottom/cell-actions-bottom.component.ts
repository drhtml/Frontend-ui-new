import { Component, Input, OnInit } from '@angular/core';
import { IColumnAction, IColumnConfig } from 'src/app/interfaces/ITableConfig';
import { IThemeColor } from 'src/app/interfaces/ITheme';

@Component({
  selector: 'app-cell-actions-bottom',
  templateUrl: './cell-actions-bottom.component.html',
  styleUrls: ['./cell-actions-bottom.component.scss'],
})
export class CellActionsBottomComponent implements OnInit {
  @Input() columnConfig?: IColumnConfig;
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}

  get options(): IColumnAction[] {
    return this.columnConfig?.actions || [];
  }

  getIconLeft(key: string): string {
    switch (key) {
      case 'view':
        return '../../../../../../../../../../assets/icons/eye-Teal.svg';
      case 'edit':
        return '../../../../../../../../../../assets/icons/edit-Teal.svg';
      case 'delete':
        return '../../../../../../../../../../assets/icons/trash-Red.svg';

      default:
        return '';
    }
  }

  getLabel(key: string): string {
    switch (key) {
      case 'view':
        return 'View';
      case 'edit':
        return 'Edit';
      case 'delete':
        return 'Delete';

      default:
        return '';
    }
  }

  getColor(key: string): IThemeColor {
    switch (key) {
      case 'view':
        return 'primary';
      case 'edit':
        return 'primary';
      case 'delete':
        return 'warn';

      default:
        return '';
    }
  }
}
