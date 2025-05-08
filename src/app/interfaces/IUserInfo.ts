import { IEvaluationStatus } from './IProperty';
export interface IEvaluationStatusCount {
  count: number;
  status: IEvaluationStatus;
}

export interface IUserInfo {
  name: string;
  email: string;
  imageUrl: string;
}

export const emptyIUserInfo: IUserInfo = {
  name: '',
  email: '',
  imageUrl: '',
};

export interface IManageUserInfo {
  id: string;
  name: IUserInfo;
  properties: number;
  location: string;
  leads?: number;
  evaluationStatus: IEvaluationStatusCount[];
  bestPricePoint: string;
  lastLogin: string;
}
