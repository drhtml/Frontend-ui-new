import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { IProperty } from 'src/app/interfaces/IProperty';
import { IScreenSize } from 'src/app/interfaces/IScreenSize';
import { IColumnConfig } from 'src/app/interfaces/ITableConfig';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';
import { WIDTH_TABLET_MAX } from 'src/app/utils/responsive';

const desktopColumnConfigs: IColumnConfig[] = [
  {
    key: 'name',
    title: 'Property',
    type: 'text',
    isSticky: true,
  },
  {
    key: 'dateAdded',
    title: 'Date Added',
    type: 'text',
  },
  {
    key: 'location',
    title: 'Location',
    type: 'text',
  },
  {
    key: 'type',
    title: 'Type',
    type: 'text',
  },
  {
    key: 'evaluationStatus',
    title: 'Evaluation Status',
    type: 'evaluation status',
  },
  {
    key: 'value',
    title: 'Value',
    type: 'text',
  },
  {
    key: 'soldPrice',
    title: 'Sold Price',
    type: 'text',
  },
  {
    key: 'spread',
    title: 'Spread',
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

const desktopColumnConfigsRealEstateAgent: IColumnConfig[] = [
  {
    key: 'name',
    title: 'Property',
    type: 'text',
    isSticky: true,
  },
  {
    key: 'dateAdded',
    title: 'Date Added',
    type: 'text',
  },
  {
    key: 'location',
    title: 'Location',
    type: 'text',
  },
  {
    key: 'type',
    title: 'Type',
    type: 'text',
  },
  {
    key: 'evaluationStatus',
    title: 'Evaluation Status',
    type: 'evaluation status',
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
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  previousScreenSize: IScreenSize = '';
  innerWidth = 0;
  isSelectable = true;
  displayedColumns: IColumnConfig[] = [];
  @Input() tableDatas: IProperty[] = [];
  @Output() deleteProperty = new EventEmitter<string>();

  isRealEstateAgent = false;

  constructor(
    public router: Router,
    public profileSettingsService: ProfileSettingsService
  ) {
    super();

    this.addSubscriptions(
      this.profileSettingsService.isRealEstateAgent.subscribe(
        (isRealEstateAgent) => {
          if (isRealEstateAgent === null) {
            return;
          }
          this.isRealEstateAgent = isRealEstateAgent;

          let tableColumns: IColumnConfig[] = [];
          if (this.isRealEstateAgent) {
            tableColumns = desktopColumnConfigsRealEstateAgent;
          } else {
            tableColumns = desktopColumnConfigs;
          }

          this.displayedColumns = _.cloneDeep(tableColumns).map((item) => {
            if (item.key === 'action' && item.actions) {
              item.actions[0].action = this.viewData.bind(this);
              item.actions[1].action = this.editData.bind(this);
              item.actions[2].action = this.removeData.bind(this);
            } else if (item.key === 'name') {
              item.onClick = this.viewData.bind(this);
            }
            return item;
          });
        }
      )
    );
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.updateUI();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.updateUI();
  }

  updateUI(): void {
    let screenSize: IScreenSize = 'desktop';
    if (this.innerWidth <= WIDTH_TABLET_MAX) {
      screenSize = 'tablet';
    }

    if (screenSize !== this.previousScreenSize) {
      this.isSelectable = screenSize === 'desktop';
      this.displayedColumns[0].isSticky = screenSize === 'tablet';
      this.displayedColumns[0].isExpandable = screenSize === 'tablet';
    }
    this.previousScreenSize = screenSize;
  }

  removeData(item: IProperty): void {
    this.deleteProperty.emit(item.id);
  }

  viewData(item: any): void {
    this.router.navigate(['/main/property/view', item.id]);
  }

  editData(item: any): void {
    this.router.navigate(['/main/property/edit', item.id]);
  }
}
