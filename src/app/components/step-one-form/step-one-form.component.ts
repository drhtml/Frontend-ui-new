import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { IResponsePlan } from 'src/app/interfaces/backendResponse/IResponsePlan';
import {
  emptyIFormPlan,
  updateIResponsePlanToFormData,
} from 'src/app/interfaces/IFormPlan';
import { IOptionField } from 'src/app/interfaces/IOptionField';
import { IScreenSize } from 'src/app/interfaces/IScreenSize';
import {
  createEmptyPlanForm,
  IPlanListFormType,
} from 'src/app/pages/main/pages/site-management/pages/main/plan-settings/plan-settings.component';
import { PlanService } from 'src/app/services/plan.service';
import { AutoUnsubscribeComponent } from '../auto-unsubscribe/auto-unsubscribe.component';

@Component({
  selector: 'app-step-one-form',
  templateUrl: './step-one-form.component.html',
  styleUrls: ['./step-one-form.component.scss'],
})
export class StepOneFormComponent
  extends AutoUnsubscribeComponent
  implements OnInit, OnChanges
{
  @Input() isAdmin = false;
  @Input() public form = new FormGroup<any>({});
  @Input() shouldShowCheckboxTerm = true;
  planListForm: IPlanListFormType = new FormArray([] as any);
  selectedPlan?: IResponsePlan;

  @Input() screenSize: IScreenSize = 'desktop';
  @Output() searchPropertyEvent = new EventEmitter<string>();

  typeOptions: IOptionField[] = [
    {
      label: 'Built',
      key: 'Built',
    },
    {
      label: 'Exterior',
      key: 'Exterior',
    },
    {
      label: 'Interior',
      key: 'Interior',
    },
  ];
  constructor(private planService: PlanService) {
    super();

    this.addSubscriptions(
      this.planService.allPlans.subscribe((plans) => {
        const formsArray: FormGroup[] = [];

        _.forEach(plans, (item) => {
          const form = createEmptyPlanForm();
          const formData = _.cloneDeep(emptyIFormPlan);
          updateIResponsePlanToFormData(formData, form, item);
          formsArray.push(form);
        });

        this.planListForm = new FormArray(formsArray);
        this.updateSelectedPlan(this.form.value.selectedPlan);
      })
    );
  }

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('form') && this.form) {
      this.addSubscriptions(
        this.getControl('selectedPlan').valueChanges.subscribe(
          (selectedPlan) => {
            this.updateSelectedPlan(selectedPlan);
          }
        )
      );
      this.updateSelectedPlan(this.form.value.selectedPlan);
    }
  }

  updateSelectedPlan(selectedPlan: string) {
    this.selectedPlan = _.find(this.planService.allPlans.value, {
      _id: selectedPlan,
    });
  }

  searchProperty(): void {
    const addressHouseNumber =
      this.getControl('addressHouseNumber').value || '';
    const addressStreetName = this.getControl('addressStreetName').value || '';
    const addressCity = this.getControl('addressCity').value || '';
    const addressState = this.getControl('addressState').value || '';
    const addressZip = this.getControl('addressZip').value || '';
    if (
      addressHouseNumber &&
      addressStreetName &&
      addressCity &&
      addressState &&
      addressZip
    ) {
      this.searchPropertyEvent.emit(
        `${addressHouseNumber} ${addressStreetName} ${addressCity}, ${addressState} ${addressZip}`
      );
    }
  }

  getFormControlField(formGroup: any, key: string): FormControl {
    return formGroup.get(key) as FormControl;
  }

  getArrayControl(key: string): FormArray {
    return this.form.get(key) as FormArray;
  }

  getControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  removeRenovation(index: number): void {
    this.getArrayControl('recentImprovements').removeAt(index);
  }

  addNewRenovation(): void {
    const recentImprovementForm = new FormGroup({
      type: new FormControl(),
      description: new FormControl(),
      date: new FormControl(),
    });

    this.getArrayControl('recentImprovements').push(recentImprovementForm);
  }

  removeAllPhotos(): void {
    this.getControl('photos').patchValue([]);
  }

  removeAllFloorPlans(): void {
    this.getControl('floorPlans').patchValue([]);
  }
}
