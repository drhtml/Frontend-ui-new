import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IScreenSize } from 'src/app/interfaces/IScreenSize';
import { PropertyDetailService } from 'src/app/services/property-detail.service';
import {
  updatePropertyFormInfo,
} from 'src/app/utils/form-property';

@Component({
  selector: 'app-edit-review-property-details',
  templateUrl: './edit-review-property-details.component.html',
  styleUrls: ['./edit-review-property-details.component.scss'],
})
export class EditReviewPropertyDetailsComponent implements OnInit {
  @Input() isAdmin = false;
  @Input() public form = new FormGroup<any>({});
  @Input() screenSize: IScreenSize = 'desktop';
  previousAddress = '';

  constructor(public propertyDetailService: PropertyDetailService) {}

  ngOnInit(): void {}

  searchProperty(address: string): void {
    if (address && this.previousAddress !== address) {
      this.propertyDetailService.fetchDetail(address).subscribe((result) => {
        if (result && result.property && result.property.length > 0) {
          const propertyInfo = result.property[0];
          if (propertyInfo) {
            updatePropertyFormInfo(this.form, propertyInfo);
          }
        }
      });
    }
    this.previousAddress = address;
  }
}
