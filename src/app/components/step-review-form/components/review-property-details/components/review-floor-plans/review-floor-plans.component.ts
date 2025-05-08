import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {
  IResponseProperty,
  IResponsePhotos,
  emptyIResponsePhotos,
} from 'src/app/interfaces/backendResponse/IResponseProperty';
import { ordinalSuffixOf } from 'src/app/utils/string';

@Component({
  selector: 'app-review-floor-plans',
  templateUrl: './review-floor-plans.component.html',
  styleUrls: ['./review-floor-plans.component.scss'],
})
export class ReviewFloorPlansComponent implements OnInit {
  @Input() propertyData?: IResponseProperty;
  photos: IResponsePhotos[] = [];

  constructor() {}

  ngOnInit(): void {}

  getFloorLabel(index: number): string {
    return `${ordinalSuffixOf(index)} Floor`;
  }

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.photos = _.filter(this.propertyData.floorPlans, (floor) => {
        const photo = _.find(this.propertyData?.photos, (p) => {
          return p.name === floor;
        });
        return !!photo;
      }).map((floor) => {
        const photo = _.find(this.propertyData?.photos, (p) => {
          return p.name === floor;
        });
        return photo as IResponsePhotos;
      });
    }
  }
}
