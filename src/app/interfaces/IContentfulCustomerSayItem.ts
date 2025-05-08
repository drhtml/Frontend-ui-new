import { IContentfulImage } from './IContentfulImage';

export interface IContentfulCustomerSayItem {
  fields: {
    name: string;
    organization: string;
    text: string;
    avatar: IContentfulImage;
  };
}
