import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IResponseProperty } from 'src/app/interfaces/backendResponse/IResponseProperty';
import {
  convertCamelCaseTextToTitleCaseText,
  convertSnakeCaseTextToTitleCaseText,
} from 'src/app/utils/string';
import { IReviewSectionData } from '../review-field-section/review-field-section.component';

@Component({
  selector: 'app-review-interior-details',
  templateUrl: './review-interior-details.component.html',
  styleUrls: ['./review-interior-details.component.scss'],
})
export class ReviewInteriorDetailsComponent implements OnInit, OnChanges {
  @Input() propertyData?: IResponseProperty;
  bed = '';
  fullBath = '';
  halfBath = '';
  remodelingAndRenovation: string[] = [];
  fuelTypes: string[] = [];
  systems: string[] = [];
  coolingFeatures: string[] = [];
  pools: string[] = [];

  coolingFeaturesKey: { [key: string]: string } = {
    mini_split: 'Mini-Splits',
  };
  datas: IReviewSectionData[][] = [];

  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.bed = `${this.propertyData.interiorDetails.bedsAndBathrooms.beds} Bed`;
      this.fullBath = `${this.propertyData.interiorDetails.bedsAndBathrooms.fullBaths} Full Bath`;
      this.halfBath = `${this.propertyData.interiorDetails.bedsAndBathrooms.halfBaths} 1/2 Bath`;
      this.fuelTypes = (
        this.propertyData.interiorDetails.heating?.fuelType || []
      ).map((text) => convertSnakeCaseTextToTitleCaseText(text));
      this.systems = (
        this.propertyData.interiorDetails.heating?.system || []
      ).map((text) => convertSnakeCaseTextToTitleCaseText(text));
      this.pools = (this.propertyData.interiorDetails.pool?.type || []).map(
        (text) => convertSnakeCaseTextToTitleCaseText(text)
      );
      this.coolingFeatures = (
        this.propertyData.interiorDetails.cooling?.system || []
      ).map(
        (text) =>
          this.coolingFeaturesKey[text] ||
          convertSnakeCaseTextToTitleCaseText(text)
      );

      this.remodelingAndRenovation = [];
      _.forOwn(
        this.propertyData.interiorDetails.remodelingAndRenovation || {},
        (value, key) => {
          if (value.didRemodel) {
            this.remodelingAndRenovation.push(
              `${convertCamelCaseTextToTitleCaseText(key)} (Remodel Year: ${
                value.remodelYear
              })`
            );
          }
        }
      );

      this.datas = [
        [
          {
            title1: 'Bedrooms and Bathrooms',
            items: [this.bed],
          },
          {
            title1: ' ',
            items: [this.fullBath],
          },
          {
            title1: ' ',
            items: [this.halfBath],
          },
        ],
        [
          {
            title1: 'Remodeling/Renovations',
            items: this.remodelingAndRenovation,
          },
        ],
        [
          {
            title1: 'Heating',
            title2: 'Fuel Type',
            items: this.fuelTypes,
          },
          {
            title1: '  ',
            title2: 'System',
            items: this.systems,
          },
        ],
        [
          {
            title1: 'Cooling',
            title2: 'Cooling Features',
            items: this.coolingFeatures,
          },
        ],
        [
          {
            title1: 'Pool',
            items: this.pools,
          },
        ],
      ];
    }
  }
}
