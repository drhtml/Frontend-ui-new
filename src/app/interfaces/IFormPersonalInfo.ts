import { IResponseProfileType } from './backendResponse/IResponsePersonalInfo';
import { IFileFormField } from './IFormFieldType';

export interface IFormPersonalInfo {
  firstName: string;
  lastName: string;
  type: IResponseProfileType;
  address: string;
  phoneNumber: string;
  avatar: IFileFormField;
}

export const emptyIFormPersonalInfo: IFormPersonalInfo = {
  firstName: '',
  lastName: '',
  type: '',
  address: '',
  phoneNumber: '',
  avatar: {
    id: '',
    url: '',
    file: null,
  },
};
