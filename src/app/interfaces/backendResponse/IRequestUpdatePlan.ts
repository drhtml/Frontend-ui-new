import { IFormPlan } from '../IFormPlan';
import { IResponsePlan } from './IResponsePlan';

export interface IRequestUpdatePlan extends IResponsePlan {}
export interface IRequestAddPlan extends Omit<IResponsePlan, '_id'> {}

export const emptyIRequestAddPlan: IRequestAddPlan = {
  features: [],
  pricePoints: 0,
  costPerYear: 0,
  name: '',
};

export const updateIRequestAddPlanFromFormData = (
  requestProperty: IRequestAddPlan,
  inputForm: IFormPlan
) => {
  requestProperty.name = inputForm.plan;
  requestProperty.costPerYear = inputForm.costPerYear;
  requestProperty.pricePoints = inputForm.pricePointsNumber;
  requestProperty.features = inputForm.features;
};

export const updateIRequestUpdatePlanFromFormData = (
  requestProperty: IRequestUpdatePlan,
  inputForm: IFormPlan
) => {
  requestProperty._id = inputForm.id;
  updateIRequestAddPlanFromFormData(requestProperty, inputForm);
};
