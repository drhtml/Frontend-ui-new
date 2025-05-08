import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { IProperty } from 'src/app/interfaces/IProperty';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';
import { WIDTH_MOBILE_MAX } from 'src/app/utils/responsive';
import { AutoUnsubscribeComponent } from '../../auto-unsubscribe/auto-unsubscribe.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-property-grid-list-item',
  templateUrl: './property-grid-list-item.component.html',
  styleUrls: ['./property-grid-list-item.component.scss'],
})
export class PropertyGridListItemComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  @Output() deleteThis = new EventEmitter();
  @Input()
  data!: IProperty;
  innerWidth = 0;
  dataCellHeight = 65;
  columns = 3;

  datas: {
    key: string;
    value: string;
  }[] = [];

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public profileSettingsService: ProfileSettingsService
  ) {
    super();

    this.addSubscriptions(
      this.profileSettingsService.isRealEstateAgent.subscribe(
        (isRealEstateAgent) => {
          if (isRealEstateAgent === null) {
            return;
          }
          this.datas = [
            {
              key: 'Date Added',
              value: 'Jan 12, 2022',
            },
            {
              key: 'Location',
              value: 'Chicago',
            },
            {
              key: 'Type',
              value: 'House',
            },
            {
              key: 'Evaluation Status',
              value: '$400,000',
            },
            {
              key: 'Value',
              value: '$410,000',
            },
            {
              key: 'Sold Price',
              value: '5%',
            },
          ];
          if (isRealEstateAgent) {
            this.datas = _.filter(
              this.datas,
              (data) => ['Value', 'Sold Price'].indexOf(data.key) < 0
            );
          }
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
    this.columns = 3;
    this.dataCellHeight = 65;
    if (this.innerWidth <= WIDTH_MOBILE_MAX) {
      this.columns = 2;
      this.dataCellHeight = 52;
    }
  }

  removeData(event: Event): void {
    this.deleteThis.emit();
  }

  ignoreEvent(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
