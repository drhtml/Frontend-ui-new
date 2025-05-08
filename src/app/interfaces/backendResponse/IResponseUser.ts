import { IManageUserInfo } from '../IUserInfo';
import { IResponseProfileType } from './IResponsePersonalInfo';

export interface IFetchUserSuccess {
  success: boolean;
  items: IManageUserInfo[];
}

export interface IFetchOneUserSuccess {
  success: boolean;
  data: IResponseUser;
}

export interface IResponseProfilePicture {
  _id: string;
  url: string;
  fileName: string;
  __v: number;
}

export interface IResponseUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  propertiesCount: number;
  address: string;
  phoneNumber: string;
  type?: IResponseProfileType;
  lastLogin: string;
  profilePicture?: IResponseProfilePicture;
}

export interface IResponseUserNotificationSettings {
  _id: string;
  notificationChannel: string;
  notificationFrequency: string;
}

export const convertFromResponseUserToIManageUserInfo = (
  response: IResponseUser
): IManageUserInfo => {
  return {
    id: response._id,
    name: {
      name: `${response.lastName} ${response.firstName}`,
      email: response.email,
      imageUrl: response.profilePicture?.url || '',
    },
    properties: response.propertiesCount,
    location: response.address,
    leads: undefined,
    evaluationStatus: [],
    bestPricePoint: '',
    lastLogin: '',
  };
};
