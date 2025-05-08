import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import {
  emptyIRequestUpdateProperty,
  IRequestUpdateProperty,
  updateIRequestUpdatePropertyFromFormData,
  updateIResponsePropertyToFormData,
} from 'src/app/interfaces/backendResponse/IRequestUpdateProperty';
import {
  emptyIResponseProperty,
  IFetchPropertySuccess,
  IResponseProperty,
} from 'src/app/interfaces/backendResponse/IResponseProperty';
import {
  emptyIFormPropertyDetail,
  IFormPropertyDetail,
} from 'src/app/interfaces/IFormPropertyDetail';
import { IScreenSize } from 'src/app/interfaces/IScreenSize';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { PlanService } from 'src/app/services/plan.service';
import { PropertyService } from 'src/app/services/property.service';
import { createEmptyPropertyForm } from 'src/app/utils/form-property';
import { WIDTH_MOBILE_MAX, WIDTH_TABLET_MAX } from 'src/app/utils/responsive';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss'],
})
export class EditPropertyComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  isAdmin = false;
  public screenSize: IScreenSize = 'desktop';
  innerWidth = 0;
  propertyId: string = '';
  public form = createEmptyPropertyForm();
  propertyData: IResponseProperty = _.cloneDeep(emptyIResponseProperty);

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    public authenticateService: AuthenticateService,
    public propertyService: PropertyService,
    private _snackBar: MatSnackBar,
    private planService: PlanService
  ) {
    super();
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.route.paramMap.subscribe((paramMap) => {
      this.propertyId = paramMap.get('id') as string;
    });
    this.isAdmin = this.authenticateService.role === 'ADMIN';
    this.reloadUI();

    this.addSubscriptions(this.planService.fetchPlans().subscribe());
  }

  reloadUI() {
    if (this.propertyId) {
      this.addSubscriptions(
        this.propertyService
          .fetchPropertyInfo(this.propertyId)
          .subscribe((rs) => {
            if (rs.success === false) {
              const failResponse = rs as IFailRequest;
              this._snackBar.open(failResponse.message, 'CLOSE', {
                verticalPosition: 'top',
                panelClass: 'error',
                duration: 3000,
              });
            } else {
              const successResponse = rs as IFetchPropertySuccess;
              const formData = _.cloneDeep(emptyIFormPropertyDetail);
              this.form = createEmptyPropertyForm();
              updateIResponsePropertyToFormData(
                formData,
                this.form,
                successResponse.data
              );
              this.propertyData = successResponse.data;
            }
          })
      );
    }
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

  getControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  doDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '560px',
      maxWidth: 'calc(100vw - 20px)',
      data: this.isAdmin
        ? {
            title: 'Delete Property',
            content:
              'Are sure you wish to delete “<strong>Property ABC Lorem</strong>” from Ashley Doe? This action will remove all property data completely and you won’t be able to Undo this action.',
            isYesNo: true,
          }
        : {
            title: 'Delete Property?',
            content:
              'Are sure you want to delete this property? This action will remove all property data completely and can not be undone.',
            isYesNo: true,
          },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.isAdmin) {
          this.router.navigate(['/main/site-management/main'], {
            queryParams: { tab: 0 },
          });
        } else {
          this.addSubscriptions(
            this.propertyService
              .deleteProperties(this.propertyId)
              .subscribe((rs) => {
                if (rs.success === false) {
                  const failResponse = rs as IFailRequest;
                  this._snackBar.open(failResponse.message, 'CLOSE', {
                    verticalPosition: 'top',
                    panelClass: 'error',
                    duration: 3000,
                  });
                } else {
                  this.router.navigate(['/main/dashboard']);
                }
              })
          );
        }
      }
    });
  }

  doReview(): void {
    this.router.navigate(['/main/property/view', this.propertyId]);
  }

  doSave(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsDirty();
        this.form.get(key)?.markAsTouched();
      });
      return;
    }
    const formDatas: IFormPropertyDetail = this.form.value as any;
    const newPropertiesBody: IRequestUpdateProperty = _.cloneDeep(
      emptyIRequestUpdateProperty
    );
    updateIRequestUpdatePropertyFromFormData(newPropertiesBody, formDatas);
    const allPhotos = [...formDatas.photos, ...formDatas.floorPlans];
    const newPhotos = _.filter(allPhotos, (p) => !!p.file);
    const deletePhotos = _.filter(
      this.propertyData.photos,
      (p) => !_.find(allPhotos, { id: p._id })
    );
    const selectedPlan = _.find(this.planService.allPlans.value, {
      _id: formDatas.selectedPlan,
    });

    this.addSubscriptions(
      forkJoin(
        // as of RxJS 6.5+ we can use a dictionary of sources
        {
          updatePropertyInfo: this.propertyService.updateProperties(
            this.propertyId,
            {
              ...this.propertyData,
              ...newPropertiesBody,
            }
          ),
          addNewPhotos: this.propertyService.uploadPhotoImages(
            this.propertyId,
            newPhotos
          ),
          deletePhotos: this.propertyService.deletePhotos(
            this.propertyId,
            deletePhotos
          ),
          selectPlan: this.propertyService.selectPlan(
            this.propertyId,
            selectedPlan
          ),
        }
      ).subscribe((rs) => {
        let failResponse: IFailRequest | null = null;
        if (rs.updatePropertyInfo.success === false) {
          failResponse = rs.updatePropertyInfo as IFailRequest;
        }
        if ((rs.addNewPhotos as IFailRequest).success === false) {
          failResponse = rs.addNewPhotos as IFailRequest;
        }
        if ((rs.deletePhotos as IFailRequest).success === false) {
          failResponse = rs.deletePhotos as IFailRequest;
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
        this.reloadUI();
      })
    );
  }
}
