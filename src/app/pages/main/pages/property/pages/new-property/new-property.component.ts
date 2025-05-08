import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import {
  emptyIRequestProperty,
  IRequestProperty,
  updateIRequestPropertyFromFormData,
} from 'src/app/interfaces/backendResponse/IRequestProperty';
import { IFetchPropertySuccess } from 'src/app/interfaces/backendResponse/IResponseProperty';
import { IFormPropertyDetail } from 'src/app/interfaces/IFormPropertyDetail';
import { IScreenSize } from 'src/app/interfaces/IScreenSize';
import { PropertyDetailService } from 'src/app/services/property-detail.service';
import { PropertyService } from 'src/app/services/property.service';
import { WIDTH_MOBILE_MAX, WIDTH_TABLET_MAX } from 'src/app/utils/responsive';
import { PlanService } from 'src/app/services/plan.service';
import { forkJoin } from 'rxjs';
import {
  createEmptyPropertyForm,
  updatePropertyFormInfo,
} from 'src/app/utils/form-property';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss'],
})
export class NewPropertyComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  public screenSize: IScreenSize = 'desktop';
  innerWidth = 0;
  public step = 1;
  previousAddress = '';
  enablePreviewBtn = false;

  public form = createEmptyPropertyForm();
  shouldShowPayment = false;

  constructor(
    public dialog: MatDialog,
    public propertyDetailService: PropertyDetailService,
    public router: Router,
    public propertyService: PropertyService,
    public planService: PlanService,
    public profileSettingsService: ProfileSettingsService,
    private _snackBar: MatSnackBar
  ) {
    super();
    this.addSubscriptions(this.planService.fetchPlans().subscribe());
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.updateUI();

    this.addSubscriptions(
      this.profileSettingsService.personalInfo.subscribe((rs) => {
        if (rs.data._id) {
          this.form.patchValue({
            email: rs.data.email,
            phoneNumber: rs.data.phoneNumber,
          });
        }
      })
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.updateUI();
  }

  updateUI(): void {
    let screenSize: IScreenSize = 'desktop';
    if (this.innerWidth <= WIDTH_MOBILE_MAX) {
      screenSize = 'mobile';
    } else if (this.innerWidth <= WIDTH_TABLET_MAX) {
      screenSize = 'tablet';
    }

    if (screenSize !== this.screenSize) {
      this.screenSize = screenSize;
    }
  }

  get stepTitle(): string {
    switch (this.step) {
      case 1:
        return 'Add Property Details';
      case 2:
        return 'Interior Details';
      case 3:
        if (this.shouldShowPayment) {
          return 'Payment';
        }
        return 'Choose Plan';
      default:
        return '';
    }
  }

  get stepDescription(): string {
    switch (this.step) {
      case 1:
        return 'Label with an asterisk (*) are mandatory for uploading.';
      case 2:
        return 'This page is listing content pulled from 3rd party sources about your property. Please check to confirm the data or edit where it’s needed.';
      case 3:
        if (this.shouldShowPayment) {
          return 'Set your payment method.';
        }
        return 'Choose a plan that fits your needs.';
      default:
        return '';
    }
  }

  nextStep(): void {
    if (this.step === 1 && this.form.invalid) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsDirty();
        this.form.get(key)?.markAsTouched();
      });
      return;
    }
    this.step += 1;
    if (this.step > 3) {
      this.step = 3;
      this.addData();
    } else {
      window.scrollTo(0, 0);
    }
  }

  doReview(): void {
    this.step = 4;
  }

  doDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '560px',
      maxWidth: 'calc(100vw - 20px)',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/main/dashboard']);
      }
    });
  }

  doEdit(): void {
    this.step = 5;
    this.getControl('name').patchValue('Property ABC Lorem'); // TODO: update this with real value
  }

  addData(): void {
    const formDatas: IFormPropertyDetail = this.form.value as any;
    const newPropertiesBody: IRequestProperty = _.cloneDeep(
      emptyIRequestProperty
    );
    updateIRequestPropertyFromFormData(newPropertiesBody, formDatas);
    const selectedPlan = _.find(this.planService.allPlans.value, {
      _id: formDatas.selectedPlan,
    });
    this.addSubscriptions(
      this.propertyService.newProperties(newPropertiesBody).subscribe((rs) => {
        if (rs.success === false) {
          const failResponse = rs as IFailRequest;
          this._snackBar.open(failResponse.message, 'CLOSE', {
            verticalPosition: 'top',
            panelClass: 'error',
            duration: 3000,
          });
        } else {
          const successResponse = rs as IFetchPropertySuccess;

          this.addSubscriptions(
            forkJoin(
              // as of RxJS 6.5+ we can use a dictionary of sources
              {
                addNewPhotos: this.propertyService.uploadPhotoImages(
                  successResponse.data._id,
                  [...formDatas.photos, ...formDatas.floorPlans]
                ),
                selectPlan: this.propertyService.selectPlan(
                  successResponse.data._id,
                  selectedPlan
                ),
              }
            ).subscribe((rs) => {
              let failResponse: IFailRequest | null = null;
              if ((rs.addNewPhotos as IFailRequest).success === false) {
                failResponse = rs.addNewPhotos as IFailRequest;
              }
              if ((rs.selectPlan as IFailRequest).success === false) {
                failResponse = rs.selectPlan as IFailRequest;
              }

              if (failResponse) {
                this._snackBar.open(failResponse.message, 'CLOSE', {
                  verticalPosition: 'top',
                  panelClass: 'error',
                  duration: 3000,
                });
              }
              this.router.navigate(['/main/dashboard']);
            })
          );
        }
      })
    );
  }

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

  getArrayControl(key: string): FormArray {
    return this.form.get(key) as FormArray;
  }

  getControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }
}
