import { IFormPersonalInfo } from '../IFormPersonalInfo';
import { emptyIResponsePhoto, IResponsePhoto } from './IResponsePhoto';

export type IResponseProfileType = 'REAL_ESTATE_AGENT' | 'CANARY' | '';

export interface IResponsePersonalInfo {
  success: boolean;
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    type: IResponseProfileType;
    address: string;
    phoneNumber: string;
    profilePicture: IResponsePhoto;
  };
}

export const emptyIResponsePersonalInfo: IResponsePersonalInfo = {
  success: true,
  data: {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    type: '',
    address: '',
    phoneNumber: '',
    profilePicture: emptyIResponsePhoto,
  },
};

export const updateIResponsePersonalInfoToFormData = (
  inputForm: IFormPersonalInfo,
  responseProperty: IResponsePersonalInfo
) => {
  inputForm.firstName = responseProperty.data.firstName;
  inputForm.lastName = responseProperty.data.lastName;
  inputForm.type = responseProperty.data.type;
  inputForm.address = responseProperty.data.address;
  inputForm.phoneNumber = responseProperty.data.phoneNumber;
  const profilePicture = responseProperty.data.profilePicture;
  inputForm.avatar = {
    id: profilePicture._id,
    url: profilePicture.url,
    file: null,
  };
};
