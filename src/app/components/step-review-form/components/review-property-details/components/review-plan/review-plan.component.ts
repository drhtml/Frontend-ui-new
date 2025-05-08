import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { IResponseProperty } from 'src/app/interfaces/backendResponse/IResponseProperty';
import {
  emptyIFormPlan,
  updateIResponsePlanToFormData,
} from 'src/app/interfaces/IFormPlan';
import { createEmptyPlanForm } from 'src/app/pages/main/pages/site-management/pages/main/plan-settings/plan-settings.component';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-review-plan',
  templateUrl: './review-plan.component.html',
  styleUrls: ['./review-plan.component.scss'],
})
export class ReviewPlanComponent implements OnInit, OnChanges {
  @Input() propertyData?: IResponseProperty;
  @Input() formControlSettings?: FormGroup;
  planName = '';

  constructor(private planService: PlanService) {}

  ngOnInit(): void {}

  public ngOnChanges(changes: any): void {
    if (
      changes.hasOwnProperty('propertyData') &&
      this.propertyData &&
      this.propertyData.plan
    ) {
      const selectedPlan = _.find(this.planService.allPlans.value, {
        _id: this.propertyData.plan.planId,
      });

      const form = createEmptyPlanForm();
      const formData = _.cloneDeep(emptyIFormPlan);
      if (selectedPlan) {
        this.planName = selectedPlan.name;
        updateIResponsePlanToFormData(formData, form, selectedPlan);
      }
      this.formControlSettings = form;
    }
  }
}
