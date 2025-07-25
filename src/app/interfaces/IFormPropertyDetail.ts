import { IParkingType } from './backendResponse/IParkingType';
import { ITypeOfHome } from './backendResponse/ITypeOfHome';
import { ICheckboxGroupFormField, IFileFormField } from './IFormFieldType';

export interface IFormPropertyDetail {
  name: string;
  address: string;
  addressHouseNumber: string;
  addressStreetName: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  schoolDistrict: string;
  describeYourHouse: string;
  beds: string;
  bathsfull: string;
  bathspartial: string;
  countertops: ICheckboxGroupFormField;
  floorplan: ICheckboxGroupFormField;
  appliancesIncluded: ICheckboxGroupFormField;
  laundryFeatures: ICheckboxGroupFormField;
  flooringType: ICheckboxGroupFormField;
  heatingtype: ICheckboxGroupFormField;
  heatingsystem: ICheckboxGroupFormField;
  coolingtype: ICheckboxGroupFormField;
  pool: ICheckboxGroupFormField;
  poolInAboveGround?: ICheckboxGroupFormField;
  windowFeatures: string;
  interiorFeatures: ICheckboxGroupFormField;
  prkgSpaces: number;
  parkingType: IParkingType;
  attachedNumberOfSpaces: number;
  detachedNumberOfSpaces: number;
  livingsize: string;
  lotSize: string;
  yearbuilteffective: string;
  remodelYear: string;
  email: string;
  phoneNumber: string;
  disclosureTerms: boolean;
  schools: {
    name: string;
    grade: number;
    distance: string;
    grades: string;
    students: string;
  }[];
  priceEvolution: {
    year: string;
    yearValue: string;
  }[];
  recentImprovements: {
    type: string;
    description: string;
    date: string;
  }[];
  photos: IFileFormField[];
  floorPlans: IFileFormField[];
  electricInformation: string;
  sewerInformation: string;
  waterInformation: string;
  utilitiesForProperty: ICheckboxGroupFormField;
  principalAndInterest: string;
  propertyTax: string;
  homeInsurance: string;
  HOAFees: string;
  utilities: string;
  totalDue: string;
  downPaymentAtClose: string;
  selectedPlan: string;
  cardholderName: string;
  cardNumber: string;
  expiredDate: string;
  ccv: string;
  saveMyPayment: boolean;
  typeOfHome: ITypeOfHome;
  aboveGrade: number;
  belowGrade: number;
  totalGrade: number;
  remodelingRenovations: ICheckboxGroupFormField;
  yearRenovatedMainPath: string;
  yearRenovatedKitchen: string;
  yearRenovatedRoof: string;
  yearRenovatedHeatingSystem: string;
  yearRenovatedWindows: string;
}

export const emptyIFormPropertyDetail: IFormPropertyDetail = {
  name: '',
  address: '',
  addressHouseNumber: '',
  addressStreetName: '',
  addressCity: '',
  addressState: '',
  addressZip: '',
  schoolDistrict: '',
  describeYourHouse: '',
  beds: '',
  bathsfull: '',
  bathspartial: '',
  countertops: {},
  floorplan: {},
  appliancesIncluded: {},
  laundryFeatures: {},
  flooringType: {},
  heatingtype: {},
  heatingsystem: {},
  coolingtype: {},
  pool: {},
  windowFeatures: '',
  interiorFeatures: {},
  prkgSpaces: 0,
  parkingType: '',
  attachedNumberOfSpaces: 0,
  detachedNumberOfSpaces: 0,
  livingsize: '',
  lotSize: '',
  yearbuilteffective: '',
  remodelYear: '',
  email: '',
  phoneNumber: '',
  disclosureTerms: false,
  schools: [],
  priceEvolution: [],
  recentImprovements: [],
  photos: [],
  floorPlans: [],
  electricInformation: '',
  sewerInformation: '',
  waterInformation: '',
  utilitiesForProperty: {},
  principalAndInterest: '',
  propertyTax: '',
  homeInsurance: '',
  HOAFees: '',
  utilities: '',
  totalDue: '',
  downPaymentAtClose: '',
  selectedPlan: '',
  cardholderName: '',
  cardNumber: '',
  expiredDate: '',
  ccv: '',
  saveMyPayment: false,
  typeOfHome: '',
  aboveGrade: 0,
  belowGrade: 0,
  totalGrade: 0,
  remodelingRenovations: {},
  yearRenovatedMainPath: '',
  yearRenovatedKitchen: '',
  yearRenovatedRoof: '',
  yearRenovatedHeatingSystem: '',
  yearRenovatedWindows: '',
};
