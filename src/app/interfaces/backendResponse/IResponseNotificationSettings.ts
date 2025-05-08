import { IFormPersonalInfo } from '../IFormPersonalInfo';
import { IResponsePhoto } from './IResponsePhoto';

export type IResponseNotificationChannel = 'EMAIL' | 'SMS' | 'BOTH' | '';
export type IResponseNotificationFrequency =
  | 'ONCE_A_DAY'
  | 'TWICE_A_DAY'
  | 'IN_REAL_TIME'
  | '';

export interface IResponseNotificationSettings {
  success: boolean;
  data: {
    _id: string;
    notificationChannel: IResponseNotificationChannel;
    notificationFrequency: IResponseNotificationFrequency;
  };
}
