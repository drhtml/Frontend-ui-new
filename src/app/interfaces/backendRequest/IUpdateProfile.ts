import * as _ from "lodash";
import { IFormUserProfileDetail } from "../IFormUserProfileDetail";

export interface IUpdateProfileRequest {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  type: string;
}

const emptyIUpdateProfileRequest: IUpdateProfileRequest = {
  firstName: '',
  lastName: '',
  address: '',
  phoneNumber: '',
  type: '',
}

export const convertFromIFormUserProfileDetailToIIUpdateProfileRequest = (formValue: IFormUserProfileDetail) => {
  const result = _.cloneDeep(emptyIUpdateProfileRequest);

  result.firstName = formValue.firstName || '';
  result.lastName = formValue.lastName || '';
  result.address = formValue.address || '';
  result.phoneNumber = formValue.phoneNumber || '';
  result.type = formValue.customerType || '';

  return result;
}