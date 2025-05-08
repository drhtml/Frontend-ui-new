import { IFormPersonalInfo } from '../IFormPersonalInfo';
import { IResponsePersonalInfo } from './IResponsePersonalInfo';
import { IResponsePhoto } from './IResponsePhoto';

export type IResponseProfileType = 'REAL_ESTATE_AGENT' | 'CANARY' | '';

export interface IRequestPersonalInfo {
  _id: string;
  firstName: string;
  lastName: string;
  type: IResponseProfileType;
  address: string;
  phoneNumber: string;
}

export const emptyIRequestPersonalInfo: IRequestPersonalInfo = {
  _id: '',
  firstName: '',
  lastName: '',
  type: '',
  address: '',
  phoneNumber: '',
};

export const updateFormDataToIRequestPersonalInfo = (
  requestPersonalInfo: IRequestPersonalInfo,
  responsePersonalInfo: IResponsePersonalInfo | undefined,
  inputForm: IFormPersonalInfo
) => {
  requestPersonalInfo._id = responsePersonalInfo?.data._id || '';
  requestPersonalInfo.firstName = inputForm.firstName;
  requestPersonalInfo.lastName = inputForm.lastName;
  requestPersonalInfo.address = inputForm.address;
  requestPersonalInfo.phoneNumber = inputForm.phoneNumber;
  requestPersonalInfo.type = inputForm.type;
};
