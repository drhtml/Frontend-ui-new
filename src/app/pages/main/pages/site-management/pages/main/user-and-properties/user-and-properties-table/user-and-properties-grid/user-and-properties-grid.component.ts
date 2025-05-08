import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { IPaginationConfig } from 'src/app/interfaces/ITableConfig';
import { IManageUserInfo } from 'src/app/interfaces/IUserInfo';
import { IUserAndPropertiesTableCellType } from '../user-and-properties-table.component';

@Component({
  selector: 'app-user-and-properties-grid',
  templateUrl: './user-and-properties-grid.component.html',
  styleUrls: ['./user-and-properties-grid.component.scss'],
})
export class UserAndPropertiesGridComponent implements OnInit {
  @Input() tableDatas: IUserAndPropertiesTableCellType[] = [];

  @Input() loading = false;
  @Input() paginationData: IPaginationConfig = {
    itemsPerPage: 0,
    currentPage: 0,
    totalItems: 0,
    isInfiniteScroll: false,
  };
  @Output() paginationChange = new EventEmitter<IPaginationConfig>();

  displayDatas: IManageUserInfo[] = [];

  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('tableDatas') && this.tableDatas) {
      this.displayDatas = _.filter(
        this.tableDatas,
        (item) => !item.isExpandChild
      ) as IManageUserInfo[];
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;

    if (
      pos === max &&
      this.paginationData &&
      this.tableDatas.length < this.paginationData.totalItems
    ) {
      if (
        this.paginationData.isInfiniteScroll ||
        this.paginationData.currentPage === 1
      ) {
        this.paginationChange.emit({
          ...this.paginationData,
          currentPage: this.paginationData.currentPage + 1,
        });
      } else {
        this.paginationChange.emit({
          ...this.paginationData,
          isInfiniteScroll: true,
          currentPage: 1,
        });
      }
    }
  }
}
