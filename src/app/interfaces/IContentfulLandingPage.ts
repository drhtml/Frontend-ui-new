import { IContentfulCardItem } from './IContentfulCardItem';
import { IContentfulCustomerSayItem } from './IContentfulCustomerSayItem';
import { IContentfulRichText } from './IContentfulRichText';

export interface IContentfulLandingPage {
  fields: {
    description: string;
    howItWorks: IContentfulCardItem[];
    welcomeToMyCanary: IContentfulRichText;
    whatYourCustomerSay: IContentfulCustomerSayItem[];
    whyUseMyCanary: IContentfulRichText;
  }
}
