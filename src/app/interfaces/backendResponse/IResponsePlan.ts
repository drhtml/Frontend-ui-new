export interface IResponsePlan {
  _id: string;
  features: string[];
  pricePoints: number;
  costPerYear: number;
  name: string;
}

export interface IFetchPlansSuccess {
  success: boolean;
  data: IResponsePlan[];
}

export const emptyIResponsePlan: IResponsePlan = {
  _id: '',
  features: [],
  pricePoints: 0,
  costPerYear: 0,
  name: '',
};
