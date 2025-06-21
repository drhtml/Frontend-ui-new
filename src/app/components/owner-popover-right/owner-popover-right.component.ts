import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import {
  IResponseListedBy,
  emptyIResponseListedBy,
  IFetchPropertiesSuccess,
} from 'src/app/interfaces/backendResponse/IResponseProperty';
import { IProperty } from 'src/app/interfaces/IProperty';
import { PropertyService } from 'src/app/services/property.service';
import { AutoUnsubscribeComponent } from '../auto-unsubscribe/auto-unsubscribe.component';

@Component({
  selector: 'app-owner-popover-right',
  templateUrl: './owner-popover-right.component.html',
  styleUrls: ['./owner-popover-right.component.scss'],
})
export class OwnerPopoverRightComponent extends AutoUnsubscribeComponent implements OnInit, OnChanges {
  @Input() ownerInfo: IResponseListedBy = _.cloneDeep(emptyIResponseListedBy);
  otherProperties: IProperty[] = [];

  constructor(
    private propertyService: PropertyService,
    private _snackBar: MatSnackBar,
  ) {
    super()
  }

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('ownerInfo') && this.ownerInfo && this.ownerInfo._id) {
      this.addSubscriptions(
        this.propertyService
          .fetchProperties(this.ownerInfo._id)
          .subscribe((rs) => {
            if (rs.success === false) {
              const failResponse = rs as IFailRequest;
              this._snackBar.open(failResponse.message, 'CLOSE', {
                verticalPosition: 'top',
                panelClass: 'error',
                duration: 3000,
              });
            } else {
              const successResponse = rs as IFetchPropertiesSuccess;
              this.otherProperties = successResponse.items;
            }
          })
      );
    }
  }

  getPropertyCity(property: IProperty): string {
    return _.get(property, 'houseFacts.address.city') ?? '';
  }
}
