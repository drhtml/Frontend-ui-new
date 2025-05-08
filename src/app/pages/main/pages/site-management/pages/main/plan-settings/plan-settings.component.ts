import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { IFailRequest } from 'src/app/interfaces/backendResponse/IFailRequest';
import {
  emptyIRequestAddPlan,
  IRequestAddPlan,
  IRequestUpdatePlan,
  updateIRequestAddPlanFromFormData,
  updateIRequestUpdatePlanFromFormData,
} from 'src/app/interfaces/backendResponse/IRequestUpdatePlan';
import {
  emptyIResponsePlan,
  IFetchPlansSuccess,
  IResponsePlan,
} from 'src/app/interfaces/backendResponse/IResponsePlan';
import {
  emptyIFormPlan,
  IFormPlan,
  updateIResponsePlanToFormData,
} from 'src/app/interfaces/IFormPlan';
import { PlanService } from 'src/app/services/plan.service';

export const createEmptyPlanForm = () => {
  return new FormGroup({
    id: new FormControl(''),
    plan: new FormControl(''),
    costPerYear: new FormControl(0),
    pricePointsNumber: new FormControl(3),
    features: new FormArray([]),
  });
};

export type IPlanListFormType = FormArray<
  FormGroup<{
    id: FormControl<string | null>;
    plan: FormControl<string | null>;
    costPerYear: FormControl<number | null>;
    pricePointsNumber: FormControl<number | null>;
    features: FormArray<FormControl<string | null>>;
  }>
>;

@Component({
  selector: 'app-plan-settings',
  templateUrl: './plan-settings.component.html',
  styleUrls: ['./plan-settings.component.scss'],
  host: {
    '[class.isEdit]': 'isEdit',
  },
})
export class PlanSettingsComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  isEdit = false;

  planList: { isPremium: boolean }[] = [
    {
      isPremium: false,
    },
    {
      isPremium: true,
    },
  ];
  bkPlanListForm = new FormArray<any>([]);
  planListForm: IPlanListFormType = new FormArray([] as any);
  bkPlanResponse: IResponsePlan[] = [];

  constructor(
    public dialog: MatDialog,
    private planService: PlanService,
    private _snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.reloadUI();
  }

  reloadUI() {
    this.addSubscriptions(
      this.planService.fetchPlans().subscribe((rs) => {
        if (rs.success === false) {
          const failResponse = rs as IFailRequest;
          this._snackBar.open(failResponse.message, 'CLOSE', {
            verticalPosition: 'top',
            panelClass: 'error',
            duration: 3000,
          });
        } else {
          const successResponse = rs as IFetchPlansSuccess;
          this.bkPlanResponse = successResponse.data;

          const formsArray: FormGroup[] = [];

          _.forEach(successResponse.data, (item) => {
            const form = createEmptyPlanForm();
            const formData = _.cloneDeep(emptyIFormPlan);
            updateIResponsePlanToFormData(formData, form, item);
            formsArray.push(form);
          });

          this.planListForm = new FormArray(formsArray);
        }
      })
    );
  }

  addNewPlan() {
    const newPlan = new FormGroup({
      id: new FormControl(''),
      plan: new FormControl('basic plan'),
      costPerYear: new FormControl(0),
      pricePointsNumber: new FormControl(3),
      features: new FormArray([]),
    });

    this.planListForm.push(newPlan as FormGroup);
  }

  removePlanAtIndex(index: number): void {
    this.planListForm.removeAt(index);
  }

  saveChange(): void {
    const formDatas = this.planListForm.value as IFormPlan[];
    const updatePlans: (IRequestUpdatePlan | IRequestAddPlan)[] = [];
    _.forEach(formDatas, (fItem) => {
      if (fItem.id) {
        const newBodyItem: IRequestUpdatePlan = _.cloneDeep(emptyIResponsePlan);
        updateIRequestUpdatePlanFromFormData(newBodyItem, fItem);
        updatePlans.push(newBodyItem);
      } else {
        const newBodyItem: IRequestAddPlan = _.cloneDeep(emptyIRequestAddPlan);
        updateIRequestAddPlanFromFormData(newBodyItem, fItem);
        updatePlans.push(newBodyItem);
      }
    });
    const deletePlans = _.filter(
      this.bkPlanResponse,
      (p) => !_.find(formDatas, { id: p._id })
    );

    this.addSubscriptions(
      forkJoin(
        // as of RxJS 6.5+ we can use a dictionary of sources
        {
          updatePlans: this.planService.updatePlans(updatePlans),
          deletePlans: this.planService.deletePlans(deletePlans),
        }
      ).subscribe((rs) => {
        let failResponse: IFailRequest | null = null;
        if (rs.updatePlans.success === false) {
          failResponse = rs.updatePlans as IFailRequest;
        }
        if ((rs.deletePlans as IFailRequest).success === false) {
          failResponse = rs.deletePlans as IFailRequest;
        }

        if (failResponse) {
          this._snackBar.open(failResponse.message, 'CLOSE', {
            verticalPosition: 'top',
            panelClass: 'error',
            duration: 3000,
          });
        } else {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '584px',
            maxWidth: 'calc(100vw - 20px)',
            data: {
              title: 'Plans Settings Updated',
              content: 'Your plans settings have been updated successfully.',
              isYesNo: false,
            },
          });

          dialogRef.afterClosed().subscribe(() => {
            this.isEdit = false;
            this.reloadUI();
          });
        }
      })
    );
  }

  doEdit(): void {
    this.bkPlanListForm = _.cloneDeep(this.planListForm);
    this.isEdit = true;
  }

  doDiscard(): void {
    this.planListForm = _.cloneDeep(this.bkPlanListForm);
    this.isEdit = false;
  }
}
