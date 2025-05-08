import { IContentfulImage } from './IContentfulImage';

export interface IContentfulCardItem {
  fields: {
    description: string;
    title: string;
    image: IContentfulImage;
  };
}
