import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import {
  IResponseProperty,
  emptyIResponseProperty,
} from 'src/app/interfaces/backendResponse/IResponseProperty';
import { IPricePointSummary } from 'src/app/interfaces/IPricePointSummary';
import { formatPrice } from 'src/app/utils/string';
import { PricePointsSummaryDialogComponent } from '../price-points-summary-dialog/price-points-summary-dialog.component';
import { ReviewPropertyDetailsComponent } from './components/review-property-details/review-property-details.component';

@Component({
  selector: 'app-step-review-form',
  templateUrl: './step-review-form.component.html',
  styleUrls: ['./step-review-form.component.scss'],
})
export class StepReviewFormComponent implements OnInit, OnChanges {
  @Input() isAdmin = false;
  @Input() shouldShowEditButton = true;
  @Input() onlyShowPropertyDetails = false;
  @Input() showPropertyHeaderDetail = true;
  @Output() edit = new EventEmitter();
  @Output() changeTab = new EventEmitter<number>();
  @ViewChild('propertyDetails') proDetailsRef?: ReviewPropertyDetailsComponent;
  @Input() propertyData: IResponseProperty = _.cloneDeep(
    emptyIResponseProperty
  );
  isLoadingData = false;
  name = '';

  pricePointSummaryDatas: IPricePointSummary[] = [];
  colors: string[] = [
    '#FFFE71',
    '#FCEAB8',
    '#F9D0B6',
    '#F3B1B1',
    '#A5D8D9',
    '#6DC8C9',
    '#F9D0B6',
    '#F3B1B1',
    '#A5D8D9',
    '#6DC8C9',
  ];
  tabIndex = 0;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.isLoadingData = _.isEqual(emptyIResponseProperty, this.propertyData);
      this.name = this.propertyData.name;

      this.pricePointSummaryDatas = (
        this.propertyData.plan?.pricePoints || []
      ).map((item, index) => ({
        price: formatPrice(`${item.price}`),
        leads: 0,
        totalScore: '$3,100K',
        isBestPricePoint: false,
        percent: `${(item.price * 100.0) / 300000}%`,
        color: this.colors[index % this.colors.length],
        name: `Price Points ${index + 1}`,
      }));
    }
  }

  selectedTabChange(index: number) {
    if (index === 0) {
      this.proDetailsRef?.reloadPriceEvolutionChart();
    }
    this.changeTab.emit(index);
    this.tabIndex = index;
  }

  showPricePointSummary(): void {
    this.dialog.open(PricePointsSummaryDialogComponent, {
      width: '338px',
      panelClass: 'right-dialog',
      maxWidth: 'calc(100vw - 20px)',
      data: this.pricePointSummaryDatas,
    });
  }
}
