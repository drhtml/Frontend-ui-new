import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { IResponsePlan } from './backendResponse/IResponsePlan';

export interface IFormPlan {
  id: string;
  plan: string;
  costPerYear: number;
  pricePointsNumber: number;
  features: string[];
}

export const emptyIFormPlan: IFormPlan = {
  id: '',
  plan: '',
  costPerYear: 0,
  pricePointsNumber: 0,
  features: [],
};

export const updateIResponsePlanToFormData = (
  inputForm: IFormPlan,
  form: FormGroup,
  responseData: IResponsePlan
) => {
  inputForm.id = responseData._id;
  inputForm.plan = responseData.name;
  inputForm.costPerYear = responseData.costPerYear;
  inputForm.pricePointsNumber = responseData.pricePoints;
  inputForm.features = responseData.features;
  form.patchValue(inputForm);

  _.forEach(responseData.features, (item) => {
    (form.get('features') as FormArray).push(new FormControl(item));
  });
};
