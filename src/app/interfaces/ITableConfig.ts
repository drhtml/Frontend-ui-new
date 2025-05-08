import { SortDirection } from '@angular/material/sort';

export type IColumnActionType = 'view' | 'edit' | 'delete';

export interface ICellConfig {
  id: string;
  isExpandChild?: boolean;
  hideThisRow?: boolean;
  parent?: string;
  config?: ICellDataConfig;
  rowType?: string;
}

type ICellAlign = 'left' | 'right';
type IColumnType =
  | 'text'
  | 'evaluation status'
  | 'actions'
  | 'actions bottom'
  | 'user info'
  | 'evaluation status list'
  | 'evaluation status collapse';

export interface ICellDataConfig {
  hideColumn?: {
    [columnName: string]: boolean;
  };
  colspan?: {
    [columnName: string]: number;
  };
  align?: {
    [columnName: string]: ICellAlign;
  };
  type?: {
    [columnName: string]: IColumnType;
  };
}
export interface IColumnAction {
  action?: (data: any) => void;
  type: IColumnActionType;
  url?: string;
}

export interface IPaginationConfig {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  isInfiniteScroll: boolean;
}

export interface IColumnConfig {
  key: string;
  title: string;
  type: IColumnType;
  actions?: IColumnAction[];
  isSticky?: boolean;
  isExpandable?: boolean;
  colspan?: number;
  align?: ICellAlign;
  showWhenExpand?: boolean;
  sortable?: boolean;
  onClick?: (data: any) => void;
}

export interface ISortObject {
  key: string;
  key2?: string;
  direction: SortDirection;
}
