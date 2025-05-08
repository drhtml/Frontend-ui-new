import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { AutoUnsubscribeComponent } from 'src/app/components/auto-unsubscribe/auto-unsubscribe.component';
import { emptyIFormPlan, updateIResponsePlanToFormData } from 'src/app/interfaces/IFormPlan';
import { IScreenSize } from 'src/app/interfaces/IScreenSize';
import { createEmptyPlanForm, IPlanListFormType } from 'src/app/pages/main/pages/site-management/pages/main/plan-settings/plan-settings.component';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-step-three-form',
  templateUrl: './step-three-form.component.html',
  styleUrls: ['./step-three-form.component.scss'],
})
export class StepThreeFormComponent
extends AutoUnsubscribeComponent implements OnInit {
  @Input() formControl = new FormControl();
  planListForm: IPlanListFormType = new FormArray([] as any);

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
      })
    );
  }

  ngOnInit(): void {}
}
