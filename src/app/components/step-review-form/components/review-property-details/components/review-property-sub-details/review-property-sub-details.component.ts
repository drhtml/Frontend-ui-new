import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IResponseProperty } from 'src/app/interfaces/backendResponse/IResponseProperty';
import { IReviewSectionData } from '../review-field-section/review-field-section.component';

@Component({
  selector: 'app-review-property-sub-details',
  templateUrl: './review-property-sub-details.component.html',
  styleUrls: ['./review-property-sub-details.component.scss'],
})
export class ReviewPropertySubDetailsComponent implements OnInit, OnChanges {
  @Input() propertyData?: IResponseProperty;
  @Input() isAdmin = false;
  datas: IReviewSectionData[][][] = [];

  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      const FinishedSquareFeet = `${this.propertyData.houseFacts.livableSquareFootage?.aboveGrade} sq. ft.`;
      const LotSize = `${this.propertyData.propertyDetails.lot?.lotSize} sq. ft.`;
      const YearBuilt = `${this.propertyData.propertyDetails.bedroomsAndBathrooms?.yearBuilt}`;
      const RemodelYear = `${this.propertyData.propertyDetails.bedroomsAndBathrooms?.remodelYear}`;

      if (this.isAdmin) {
        this.datas = [
          [
            [
              {
                title1: 'Lot',
                title2: 'Finished Square Feet',
                items: [FinishedSquareFeet],
              },
            ],
          ],
        ];
        const parkingType = this.propertyData.propertyDetails.parking?.type;
        const offStreetSpaces =
          this.propertyData.propertyDetails.parking?.offStreetSpaces;
        const attachedGarageSpaces =
          this.propertyData.propertyDetails.parking?.attachedGarageSpaces;
        const detachedGarageSpaces =
          this.propertyData.propertyDetails.parking?.detachedGarageSpaces;
        if (parkingType === 'off_street') {
          this.datas.push([
            [
              {
                title1: 'Garage details',
                title2: 'Parking type',
                items: ['Off Street (No Garage)'],
              },
              {
                title1: ' ',
                title2: 'Number of spaces',
                items: [`${offStreetSpaces}`],
              },
            ],
          ]);
        } else if (parkingType === 'garage') {
          this.datas.push([
            [
              {
                title1: 'Garage details',
                title2: 'Parking type',
                items: ['Garage'],
              },
              {
                title1: ' ',
                title2: 'Attached number of spaces',
                items: [`${attachedGarageSpaces}`],
              },
              {
                title1: ' ',
                title2: 'Detached number of spaces',
                items: [`${detachedGarageSpaces}`],
              },
            ],
          ]);
        } else {
          this.datas.push([
            [
              {
                title1: 'Garage details',
                title2: 'Parking type',
                items: ['No Private Parking'],
              },
            ],
          ]);
        }
      } else {
        this.datas = [
          [
            [
              {
                title1: 'Lot',
                title2: 'Finished Square Feet',
                items: [FinishedSquareFeet],
              },
            ],
            [
              {
                title2: 'Lot Size',
                items: [LotSize],
              },
            ],
          ],
          [
            [
              {
                title1: 'Building and Construction',
                title2: 'Year Built',
                items: [YearBuilt],
              },
              {
                title1: ' ',
                title2: 'Remodel Year',
                items: [RemodelYear],
              },
            ],
          ],
        ];
      }
    }
  }
}
