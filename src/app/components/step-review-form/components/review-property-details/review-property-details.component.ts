import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as _ from 'lodash';
import {
  IResponseProperty,
  emptyIResponseProperty,
} from 'src/app/interfaces/backendResponse/IResponseProperty';
import { ReviewPriceEvolutionComponent } from './components/review-price-evolution/review-price-evolution.component';

@Component({
  selector: 'app-review-property-details',
  templateUrl: './review-property-details.component.html',
  styleUrls: ['./review-property-details.component.scss'],
})
export class ReviewPropertyDetailsComponent implements OnInit, AfterViewInit {
  @Input() isAdmin = false;
  @Input() showPropertyHeaderDetail = true;
  @ViewChild('priceEvolution') pEvolution?: ReviewPriceEvolutionComponent;
  @Input() propertyData?: IResponseProperty;
  overview = '';

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  reloadPriceEvolutionChart(): void {
    this.pEvolution?.reloadPriceEvolutionChart();
  }

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.overview = this.propertyData.houseFacts.description;
    }
  }
}
