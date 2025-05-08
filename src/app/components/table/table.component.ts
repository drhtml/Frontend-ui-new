import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import {
  IColumnConfig,
  IPaginationConfig,
  ISortObject,
} from 'src/app/interfaces/ITableConfig';

type ITableTheme = 'admin' | 'user' | 'price-point';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  host: {
    '[class]': "'theme-' + theme",
  },
})
export class TableComponent implements OnInit {
  columnKeys: string[] = [];
  @Input() displayedColumns: IColumnConfig[] = [];
  @Input() sortable?: ISortObject;
  @Input() selectable = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @Input() inputDatas: any[] = [];
  @Input() theme: ITableTheme = 'user';
  @Input() expandRowTemplate?: TemplateRef<any>;
  @Input() loading: boolean = false;
  @ViewChild(MatSort) sort?: MatSort;
  @Input() paginationData?: IPaginationConfig;
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() paginationChange = new EventEmitter<IPaginationConfig>();
  @Output() onExpand = new EventEmitter<any | null>();

  expandedElement: any | null;
  selection = new SelectionModel<any>(true, []);

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    const isChangeDisplayedColumns = !!changes['displayedColumns'];

    const isChangeSelectable = !!changes['selectable'];

    const isChangeSortable = !!changes['sortable'];

    const isChangeData = !!changes['inputDatas'];
    if (isChangeDisplayedColumns || isChangeSelectable) {
      let isExpantable = false;
      this.columnKeys = this.displayedColumns.map((item) => {
        if (item.isExpandable) {
          isExpantable = true;
        }
        return item.key;
      });
      if (!isExpantable) {
        this.expandedElement = null;
      }
      if (this.selectable) {
        this.columnKeys.unshift('select');
      }
    }

    if (isChangeData) {
      const previousValue = _.filter(changes['inputDatas'].previousValue, (item) => !item.parent);
      const currentValue = _.filter(changes['inputDatas'].currentValue, (item) => !item.parent);
      if (!_.isEqual(previousValue, currentValue)) {
        this.expandedElement = null;
      }
      this.dataSource.data = this.inputDatas;
    }

    if (isChangeSortable && this.sort) {
      this.sort.sort({
        id: this.sortable ? this.sortable.key : '',
        start: this.sortable ? this.sortable.direction : '',
        disableClear: false,
      });
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  sortData(sort: Sort) {
    this.sortChange.emit(sort);
  }

  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      this.paginationData &&
      this.dataSource.data.length < this.paginationData.totalItems &&
      this.paginationData.isInfiniteScroll
    ) {
      this.paginationChange.emit({
        ...this.paginationData,
        currentPage: this.paginationData.currentPage + 1,
      });
    }
  }

  onClickCell(column: IColumnConfig, element: any) {
    if (column.isExpandable) {
      this.expandedElement = this.expandedElement === element ? null : element;
      this.onExpand.emit(this.expandedElement);
    }
    column.onClick?.(element);
  }
}
