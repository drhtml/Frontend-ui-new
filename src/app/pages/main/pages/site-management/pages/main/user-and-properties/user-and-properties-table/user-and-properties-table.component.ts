import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import { IFetchUserSuccess } from 'src/app/interfaces/backendResponse/IResponseUser';
import { IOptionField } from 'src/app/interfaces/IOptionField';
import { IProperty } from 'src/app/interfaces/IProperty';
import { IScreenSize } from 'src/app/interfaces/IScreenSize';
import { Sort } from '@angular/material/sort';
import {
  ICellConfig,
  ICellDataConfig,
  IColumnConfig,
  IPaginationConfig,
  ISortObject,
} from 'src/app/interfaces/ITableConfig';
import { IManageUserInfo } from 'src/app/interfaces/IUserInfo';
import { UsersService } from 'src/app/services/users.service';
import { WIDTH_MOBILE_MAX, WIDTH_TABLET_MAX } from 'src/app/utils/responsive';
import { paginate, paginateUntilPage } from 'src/app/utils/other';
import { PropertyService } from 'src/app/services/property.service';
import { IFetchPropertiesSuccess } from 'src/app/interfaces/backendResponse/IResponseProperty';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

const desktopColumnConfigs: IColumnConfig[] = [
  {
    key: 'id',
    title: 'ID',
    type: 'text',
    isExpandable: true,
    sortable: true,
  },
  {
    key: 'name',
    title: 'NAME',
    type: 'user info',
    showWhenExpand: true,
    sortable: true,
  },
  {
    key: 'properties',
    title: 'PROPERTIES',
    type: 'text',
    showWhenExpand: true,
    sortable: true,
  },
  {
    key: 'location',
    title: 'LOCATION',
    type: 'text',
    sortable: true,
  },
  {
    key: 'leads',
    title: 'LEADS',
    type: 'text',
    sortable: true,
  },
  {
    key: 'evaluationStatus',
    title: 'Evaluation Status',
    type: 'evaluation status list',
    sortable: true,
  },
  {
    key: 'bestPricePoint',
    title: 'BEST PRICE POINT',
    type: 'text',
    sortable: true,
  },
  {
    key: 'lastLogin',
    title: 'LAST LOGIN',
    type: 'text',
    showWhenExpand: true,
    sortable: true,
  },
  {
    key: 'action',
    title: 'Actions',
    type: 'actions',
    showWhenExpand: true,
    sortable: true,
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

const tabletColumnConfigs: IColumnConfig[] = [
  {
    key: 'name',
    title: 'NAME',
    type: 'user info',
    isExpandable: true,
    showWhenExpand: true,
    sortable: true,
  },
  {
    key: 'location',
    title: 'LOCATION',
    type: 'text',
    sortable: true,
  },
  {
    key: 'leads',
    title: 'LEADS',
    type: 'text',
    sortable: true,
  },
  {
    key: 'evaluationStatus',
    title: 'Evaluation Status',
    type: 'evaluation status list',
    sortable: true,
  },
  {
    key: 'bestPricePoint',
    title: 'BEST PRICE POINT',
    type: 'text',
    sortable: true,
  },
  {
    key: 'action',
    title: 'Actions',
    type: 'actions',
    showWhenExpand: true,
    sortable: true,
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

interface IPropertyCell extends IProperty, ICellConfig {}

interface IManageUserInfoCell extends IManageUserInfo, ICellConfig {}

export type IUserAndPropertiesTableCellType =
  | IPropertyCell
  | IManageUserInfoCell
  | ICellConfig;

@Component({
  selector: 'app-user-and-properties-table',
  templateUrl: './user-and-properties-table.component.html',
  styleUrls: ['./user-and-properties-table.component.scss'],
})
export class UserAndPropertiesTableComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  previousScreenSize: IScreenSize = '';
  innerWidth = 0;

  displayedColumns: IColumnConfig[] = desktopColumnConfigs;
  sortBy: IOptionField[] = [
    {
      label: 'ID',
      key: 'id',
    },
    {
      label: 'Name',
      key: 'name',
      key2: 'name.name',
    },
    {
      label: 'Properties',
      key: 'properties',
    },
    {
      label: 'Location',
      key: 'location',
    },
    {
      label: 'Leads',
      key: 'leads',
    },
    {
      label: 'Best Price Point',
      key: 'bestPricePoint',
    },
    {
      label: 'Last Login',
      key: 'lastLogin',
    },
  ];
  bkBackendResponse: IUserAndPropertiesTableCellType[] = [];
  tableDatas: IUserAndPropertiesTableCellType[] = [];
  paginationDatas: IUserAndPropertiesTableCellType[] = [];
  @Input() sortable?: ISortObject;
  @Input() tableSort?: Sort;
  @Input() sortByFormControl: FormControl = new FormControl();
  @Input() searchFormControl: FormControl = new FormControl('');
  isLoading = false;
  paginationData: IPaginationConfig = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1,
    isInfiniteScroll: false,
  };

  constructor(
    public router: Router,
    public usersService: UsersService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public propertyService: PropertyService
  ) {
    super();
  }

  ngOnInit(): void {
    this.sortByFormControl.valueChanges.subscribe((value) => {
      this.sortable = {
        key: value,
        direction: 'desc',
      };
    });
    this.searchFormControl.valueChanges.subscribe((value) => {
      this.getPaginationDatas();
    });
    this.innerWidth = window.innerWidth;

    this.addSubscriptions(
      this.usersService.fetchUsers().subscribe((rs) => {
        if (rs.success === false) {
          const failResponse = rs as IFailRequest;
          this._snackBar.open(failResponse.message, 'CLOSE', {
            verticalPosition: 'top',
            panelClass: 'error',
            duration: 3000,
          });
        } else {
          const successResponse = rs as IFetchUserSuccess;
          this.bkBackendResponse = successResponse.items;
          this.paginationData.totalItems = this.bkBackendResponse.length;
          this.getPaginationDatas();
        }
      })
    );

    this.updateUI();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.updateUI();
  }

  getDataBySceenSize(
    datas: IUserAndPropertiesTableCellType[],
    screenSize: IScreenSize
  ): IUserAndPropertiesTableCellType[] {
    return datas.map((item) => {
      if (!item.isExpandChild) {
        return item;
      }
      if (item.rowType === 'actionRow') {
        return {
          ...item,
          hideThisRow: screenSize === 'desktop',
          config: childActionRowColumnTabletConfig,
        };
      }
      return {
        ...item,
        config:
          screenSize === 'desktop'
            ? childRowColumnConfig
            : childRowColumnTabletConfig,
      };
    });
  }

  updateUI(): void {
    let screenSize: IScreenSize = 'desktop';

    if (this.innerWidth <= WIDTH_MOBILE_MAX) {
      screenSize = 'mobile';
    } else if (this.innerWidth <= WIDTH_TABLET_MAX) {
      screenSize = 'tablet';
    }

    if (screenSize !== this.previousScreenSize) {
      this.displayedColumns =
        screenSize === 'desktop'
          ? desktopColumnConfigs.map((item) => {
              if (item.key === 'action' && item.actions) {
                item.actions[0].action = this.viewData.bind(this);
                item.actions[1].action = this.editData.bind(this);
                item.actions[2].action = this.removeData.bind(this);
              }
              return item;
            })
          : tabletColumnConfigs;
      this.tableDatas = this.getDataBySceenSize(this.tableDatas, screenSize);
    }
    this.previousScreenSize = screenSize;
  }

  paginationChange(pageData: IPaginationConfig) {
    if (this.isLoading) {
      return;
    }
    this.paginationData = pageData;
    this.getPaginationDatas();
  }
  sortChange(sort: Sort) {
    this.tableSort = sort;
    this.sortData();
  }
  onExpand(expandElement: IUserAndPropertiesTableCellType | null) {
    if (expandElement) {
      const childs = _.filter(this.paginationDatas, (item) => {
        return item.parent === expandElement.id && item.rowType !== 'actionRow';
      });
      if (!childs.length) {
        this.addSubscriptions(
          this.propertyService
            .fetchProperties(expandElement.id)
            .subscribe((rs) => {
              if (rs.success === false) {
                const failResponse = rs as IFailRequest;
                this._snackBar.open(failResponse.message, 'CLOSE', {
                  verticalPosition: 'top',
                  panelClass: 'error',
                  duration: 3000,
                });
              } else {
                const successResponse = rs as IFetchPropertiesSuccess;
                const propertyList = successResponse.items;
                this.bkBackendResponse = [
                  ...this.bkBackendResponse,
                  ...propertyList.map((item) => ({
                    ...item,
                    isExpandChild: true,
                    config: childRowColumnConfig,
                    parent: expandElement.id,
                  })),
                ];
                this.getPaginationDatas();
              }
            })
        );
      }
    }
  }

  getPaginationDatas() {
    let paginationDatas: IUserAndPropertiesTableCellType[] = [];
    const childs: IUserAndPropertiesTableCellType[] = [];
    const bkBackendResponse = this.getDataBySceenSize(
      this.bkBackendResponse,
      this.previousScreenSize
    );
    _.forEach(bkBackendResponse, (item) => {
      if (item.rowType !== 'actionRow') {
        if (item.parent) {
          childs.push(item);
        } else {
          paginationDatas.push(item);
        }
      }
    });
    if (this.paginationData.isInfiniteScroll) {
      paginationDatas = paginateUntilPage(
        paginationDatas,
        this.paginationData.itemsPerPage,
        this.paginationData.currentPage
      );
    } else {
      paginationDatas = paginate(
        paginationDatas,
        this.paginationData.itemsPerPage,
        this.paginationData.currentPage
      );
    }
    paginationDatas = _.filter(paginationDatas, (data) => {
      const dataUser = data as IManageUserInfoCell;
      if (dataUser.name) {
        return (
          dataUser.name.name
            .toLowerCase()
            .indexOf(this.searchFormControl.value.toLowerCase()) >= 0
        );
      }
      return true;
    });

    this.paginationDatas = [];
    _.forEach(paginationDatas, (item) => {
      this.paginationDatas.push(item);
      const itemChilds = _.filter(childs, { parent: item.id });
      _.forEach(itemChilds, (iChild) => {
        this.paginationDatas.push(iChild);
      });
      this.paginationDatas.push({
        id: `${item.id}_actionRow`,
        config: childActionRowColumnTabletConfig,
        hideThisRow: true,
        isExpandChild: true,
        rowType: 'actionRow',
        parent: item.id,
      });
    });

    this.sortData();
  }

  sortData() {
    if (this.tableSort && this.tableSort.direction) {
      const selectedValue = _.find(this.sortBy, { key: this.tableSort.active });
      if (selectedValue) {
        const key = selectedValue.key;
        const key2 = selectedValue.key2;
        const direction = this.tableSort.direction;

        let tableDatas: IUserAndPropertiesTableCellType[] = [];
        const childs: IUserAndPropertiesTableCellType[] = [];
        _.forEach(this.paginationDatas, (item) => {
          if (item.parent) {
            childs.push(item);
          } else {
            tableDatas.push(item);
          }
        });

        tableDatas = _.orderBy(
          tableDatas,
          (d) => {
            return ((_.get(d, key2 || key) || '') as string).toLowerCase();
          },
          direction
        );
        this.tableDatas = [];
        _.forEach(tableDatas, (item) => {
          this.tableDatas.push(item);
          const itemChilds = _.filter(childs, { parent: item.id });
          _.forEach(itemChilds, (iChild) => {
            this.tableDatas.push(iChild);
          });
          this.tableDatas.push({
            id: `${item.id}_actionRow`,
            config: childActionRowColumnTabletConfig,
            hideThisRow: true,
            isExpandChild: true,
            rowType: 'actionRow',
            parent: item.id,
          });
        });
      }
    } else {
      this.tableDatas = this.paginationDatas;
    }
  }

  removeData(item: any): void {
    if (!item.isExpandChild) {
      this.dialog.open(ConfirmationDialogComponent, {
        width: '584px',
        maxWidth: 'calc(100vw - 20px)',
        data: {
          title: 'Delete User',
          content:
            `Are you sure wish to delete user <strong>${item.name.name}</strong>? This action will remove all user’s data completely and you won’t be able to undo this action.`,
          isYesNo: true,
        },
      });
    }
  }

  viewData(item: IUserAndPropertiesTableCellType): void {
    if (!item.isExpandChild) {
      this.router.navigate(['/main/site-management/user-profile', item.id]);
    } else if (item.rowType !== 'actionRow') {
      this.router.navigate(['/main/property/view', item.id]);
    }
  }

  editData(item: any): void {
    if (!item.isExpandChild) {
      this.router.navigate(['/main/site-management/user-profile', item.id],
      { queryParams: {isEdit: true} });
    } else if (item.isExpandChild && item.rowType !== 'actionRow') {
      this.router.navigate(['/main/property/edit', item.id]);
    }
  }
}

const childRowColumnConfig: ICellDataConfig = {
  hideColumn: {
    id: true,
    properties: true,
  },
  colspan: {
    name: 3,
  },
  align: {
    name: 'right',
  },
  type: {
    name: 'text',
    evaluationStatus: 'evaluation status collapse',
  },
};

const childRowColumnTabletConfig: ICellDataConfig = {
  type: {
    name: 'text',
    evaluationStatus: 'evaluation status collapse',
  },
};

const childActionRowColumnTabletConfig: ICellDataConfig = {
  hideColumn: {
    name: true,
    location: true,
    leads: true,
    evaluationStatus: true,
    bestPricePoint: true,
  },
  colspan: {
    action: 6,
  },
  type: {
    action: 'actions bottom',
  },
};
