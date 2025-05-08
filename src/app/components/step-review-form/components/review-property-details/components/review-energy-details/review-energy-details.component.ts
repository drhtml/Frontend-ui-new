import { Component, Input, OnInit } from '@angular/core';
import { IResponseProperty } from 'src/app/interfaces/backendResponse/IResponseProperty';

@Component({
  selector: 'app-review-energy-details',
  templateUrl: './review-energy-details.component.html',
  styleUrls: ['./review-energy-details.component.scss'],
})
export class ReviewEnergyDetailsComponent implements OnInit {
  @Input() propertyData?: IResponseProperty;
  electricInformation = '';
  sewerInformation = '';
  waterInformation = '';
  utilitiesForProperty: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('propertyData') && this.propertyData) {
      this.electricInformation =
        this.propertyData.utilitiesOrGreenEnergyDetails?.electricInformation;
      this.sewerInformation =
        this.propertyData.utilitiesOrGreenEnergyDetails?.sewerInformation;
      this.waterInformation =
        this.propertyData.utilitiesOrGreenEnergyDetails?.waterInformation;
      this.utilitiesForProperty =
        this.propertyData.utilitiesOrGreenEnergyDetails?.utilitiesForProperty;
    }
  }
}
