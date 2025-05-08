import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { IResponseDashboardRealEstateAgent } from 'src/app/interfaces/backendResponse/IResponseDashboardRealEstateAgent';
import { IProperty } from 'src/app/interfaces/IProperty';
import { WIDTH_MOBILE_MAX, WIDTH_TABLET_MAX } from 'src/app/utils/responsive';

@Component({
  selector: 'app-dashboard-property-list',
  templateUrl: './dashboard-property-list.component.html',
  styleUrls: ['./dashboard-property-list.component.scss'],
})
export class DashboardPropertyListComponent implements OnInit {
  innerWidth = 0;
  columns = 6;
  gutterSize = '';
  @Input() propertyList: IProperty[] = [];
  @Output() removeItem = new EventEmitter<string>();
  @Input() dashboardRealEstateAgent?: IResponseDashboardRealEstateAgent;

  constructor() {}

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
    this.gutterSize = '32px';
    if (this.innerWidth <= WIDTH_MOBILE_MAX) {
      this.columns = 1;
    } else if (this.innerWidth <= WIDTH_TABLET_MAX) {
      this.columns = 2;
      this.gutterSize = '26px';
    }
  }
}
