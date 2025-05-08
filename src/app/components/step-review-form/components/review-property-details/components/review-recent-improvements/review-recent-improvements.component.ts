import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import {
  IResponseProperty,
  IResponseRecentImprovement,
} from 'src/app/interfaces/backendResponse/IResponseProperty';

@Component({
  selector: 'app-review-recent-improvements',
  templateUrl: './review-recent-improvements.component.html',
  styleUrls: ['./review-recent-improvements.component.scss'],
})
export class ReviewRecentImprovementsComponent implements OnInit {
  @Input() propertyData?: IResponseProperty;
  recentImprovements: IResponseRecentImprovement[] = [];

  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.recentImprovements = (
        this.propertyData.recentImprovements || []
      ).map((item) => {
        return {
          ...item,
          dateString: moment(item.date).format('MMM, YYYY'),
        };
      });
    }
  }
}
