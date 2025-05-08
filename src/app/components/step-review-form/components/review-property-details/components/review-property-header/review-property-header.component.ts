import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {
  IResponseProperty,
  IResponsePhotos,
} from 'src/app/interfaces/backendResponse/IResponseProperty';
import { getFileNameWithoutExtension } from 'src/app/utils/string';

@Component({
  selector: 'app-review-property-header',
  templateUrl: './review-property-header.component.html',
  styleUrls: ['./review-property-header.component.scss'],
})
export class ReviewPropertyHeaderComponent implements OnInit, OnChanges {
  @Input() showPropertyHeaderDetail = true;
  @Input() isAdmin = false;
  @Input() propertyData?: IResponseProperty;
  location = '';
  description = '';
  photos: IResponsePhotos[] = [];
  selectedPhoto?: IResponsePhotos;

  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.location = `${this.propertyData.houseFacts.address.houseNumber} ${this.propertyData.houseFacts.address.streetName} ${this.propertyData.houseFacts.address.city}, ${this.propertyData.houseFacts.address.state} ${this.propertyData.houseFacts.address.zipCode}`;
      if (this.isAdmin) {
        this.description = `${this.propertyData.interiorDetails.bedsAndBathrooms.beds} Bed • ${this.propertyData.interiorDetails.bedsAndBathrooms.fullBaths} Bath • ${this.propertyData.houseFacts.livableSquareFootage?.aboveGrade} sq. ft.`;
      } else {
        this.description = `${this.propertyData.interiorDetails.bedsAndBathrooms.beds} Bed • ${this.propertyData.interiorDetails.bedsAndBathrooms.fullBaths} Bath • ${this.propertyData.propertyDetails.lot?.finishedSquareFeet} sq. ft. • Built: ${this.propertyData.propertyDetails.bedroomsAndBathrooms?.yearBuilt}`;
      }
      this.photos = _.filter(this.propertyData.photos, (item) => {
        return _.every(this.propertyData?.floorPlans, (floorPlan) => {
          return item.name !== floorPlan;
        });
      });
      if (
        this.photos[0] &&
        (!this.selectedPhoto || this.photos[0]._id !== this.selectedPhoto?._id)
      ) {
        this.loading = true;
        this.selectedPhoto = this.photos[0];
      }
    }
  }

  loading: boolean = false;
  onLoad() {
    this.loading = false;
  }

  selectImage(img: IResponsePhotos) {
    if (!this.selectedPhoto || img._id !== this.selectedPhoto?._id) {
      this.selectedPhoto = img;
      this.loading = true;
    }
  }
}
