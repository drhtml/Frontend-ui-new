import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as _ from 'lodash';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';
import { WIDTH_MOBILE_MAX, WIDTH_TABLET_MAX } from 'src/app/utils/responsive';

interface IKpiItem {
  value: string;
  key: string;
}
@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss'],
  host: {
    '[class.isExpand]': 'isExpand',
  },
})
export class KpiComponent
  extends AutoUnsubscribeComponent
  implements OnInit, OnChanges
{
  innerWidth = 0;
  @Input() dataLength = 0;
  columns = 6;
  isExpand = false;
  isRealEstateAgent = false;
  isCanary = false;

  @Input() kpis: IKpiItem[] = [
    {
      key: 'Active Properties',
      value: '1',
    },
    {
      key: 'Average Spread',
      value: '3%',
    },
    {
      key: 'Total Amount',
      value: '$789K',
    },
    {
      key: 'Total Leads',
      value: '19',
    },
    {
      key: 'Total Views',
      value: '345',
    },
    {
      key: 'Campaigns',
      value: '1',
    },
  ];

  filteredKpis: IKpiItem[] = [];

  constructor(public profileSettingsService: ProfileSettingsService) {
    super();

    this.addSubscriptions(
      this.profileSettingsService.isRealEstateAgent.subscribe(
        (isRealEstateAgent) => {
          if (isRealEstateAgent !== null) {
            this.isRealEstateAgent = isRealEstateAgent;
            this.updateKpis();
          }
        }
      )
    );
    this.addSubscriptions(
      this.profileSettingsService.isCanary.subscribe((isCanary) => {
        if (isCanary !== null) {
          this.isCanary = isCanary;
          this.updateKpis();
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateKpis();
  }

  updateKpis() {
    this.filteredKpis = this.kpis;
    if (this.isRealEstateAgent) {
      this.filteredKpis = _.filter(
        this.filteredKpis,
        (kpi) =>
          ['Average Spread', 'Total Leads', 'Total Views'].indexOf(kpi.key) < 0
      );
    } else if (this.isCanary) {
      this.filteredKpis = _.filter(
        this.filteredKpis,
        (kpi) =>
          ['Average Spread', 'Total Leads', 'Total Views'].indexOf(kpi.key) < 0
      );
    }
  }

  get kpisDisplay() {
    if (this.innerWidth <= WIDTH_MOBILE_MAX && !this.isExpand) {
      return this.filteredKpis.slice(0, 2);
    }
    return this.filteredKpis;
  }

  get cellHeight() {
    if (this.innerWidth <= WIDTH_MOBILE_MAX && this.isExpand) {
      return 90;
    }
    return 103;
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
    this.columns = this.kpis.length;
    if (this.innerWidth <= WIDTH_MOBILE_MAX) {
      this.columns = 2;
    } else if (this.innerWidth <= WIDTH_TABLET_MAX) {
      this.columns = 3;
    }
  }
}
