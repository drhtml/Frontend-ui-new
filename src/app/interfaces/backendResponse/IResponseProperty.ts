import * as moment from 'moment';
import { IDate } from '../IDate';
import { IEvaluationStatus, IProperty } from '../IProperty';
import { IParkingType } from './IParkingType';
import { IResponsePhoto } from './IResponsePhoto';
import { ITypeOfHome } from './ITypeOfHome';

export interface IResponseAddress {
  houseNumber: string;
  streetName: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IResponseLivableSquareFootage {
  aboveGrade: number;
  belowGrade: number;
  total: number;
}

export interface IResponseHouseFacts {
  address: IResponseAddress;
  description: string;
  schoolDistrict: string;
  typeOfHome: ITypeOfHome;
  livableSquareFootage: IResponseLivableSquareFootage;
}

export interface IResponsePhotos {
  _id: string;
  url: string;
  fileName: string;
  name?: string;
  nameWithExtension?: string;
}

export const emptyIResponsePhotos: IResponsePhotos = {
  _id: '',
  url: '',
  fileName: '',
  name: '',
};

export interface IResponseBedsAndBathrooms {
  beds: string;
  fullBaths: string;
  halfBaths: string;
}

export interface IResponseKitchen {
  counterTops: string[];
  floorPlan: string[];
}

export interface IResponseAppliances {
  appliances: string[];
  laundryFeatures: string[];
}

export interface IResponseFlooring {
  flooringType: string[];
}

export interface IResponseHeating {
  fuelType: string[];
  system: string[];
}

export interface IResponseCooling {
  system: string[];
}

export interface IResponsePool {
  type: string[];
}

export interface IResponseInteriorFeatures {
  windowFeatures: string;
  interiorFeatures: string[];
}

export interface IResponseRemodelingAndRenovationItem {
  didRemodel: boolean;
  remodelYear?: number;
}

export interface IResponseRemodelingAndRenovation {
  mainBath: IResponseRemodelingAndRenovationItem;
  kitchen: IResponseRemodelingAndRenovationItem;
  roof: IResponseRemodelingAndRenovationItem;
  heatingSystem: IResponseRemodelingAndRenovationItem;
  windows: IResponseRemodelingAndRenovationItem;
}

export interface IResponseInteriorDetails {
  remodelingAndRenovation: IResponseRemodelingAndRenovation;
  bedsAndBathrooms: IResponseBedsAndBathrooms;
  kitchen: IResponseKitchen;
  appliances: IResponseAppliances;
  flooring: IResponseFlooring;
  heating: IResponseHeating;
  cooling: IResponseCooling;
  pool: IResponsePool;
  interiorFeatures: IResponseInteriorFeatures;
}

export interface IResponseParking {
  type: IParkingType;
  offStreetSpaces: number;
  attachedGarageSpaces: number;
  detachedGarageSpaces: number;
}

export interface IResponseLot {
  finishedSquareFeet: number;
  lotSize: number;
}

export interface IResponseBedroomsAndBathrooms {
  yearBuilt: number;
  remodelYear: number;
}

export interface IResponsePropertyDetails {
  parking: IResponseParking;
  lot: IResponseLot;
  bedroomsAndBathrooms: IResponseBedroomsAndBathrooms;
}

export interface IResponseRecentImprovement {
  type: string;
  description: string;
  date: Date;
  dateString?: string;
  _id: string;
}

export interface IResponseContact {
  email: string;
  phoneNumber: string;
}

export interface IResponseMonthlyPayment {
  principalAndInterest: number;
  propertyTax: number;
  homeInsurance: number;
  hoaFees: number;
  utilities: number;
  total: number;
  downPayment: number;
}

export interface IResponseSchool {
  name: string;
  grades: string;
  distances: string;
  overallGrade: number;
  students: string;
  _id: string;
}

export interface IResponsePropertyPriceEvaluation {
  year: number;
  price: number;
  _id: string;
}

export interface IResponseUtilitiesOrGreenEnergyDetails {
  electricInformation: string;
  sewerInformation: string;
  waterInformation: string;
  utilitiesForProperty: string[];
}

export interface IResponsePricePoint {
  _id: string;
  price: number;
  startDate: string | Date;
  endDate: string | Date;
}

export interface IResponseSelectedPlan {
  planId: string;
  price: string;
  pricePoints: IResponsePricePoint[];
}

export interface IResponseListedBy {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: IResponsePhoto;
}

export const emptyIResponseListedBy: IResponseListedBy = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  profilePicture: {
    _id: '',
    url: '',
    fileName: '',
  },
};

export interface IResponseProperty {
  _id: string;
  name: string;
  photos: IResponsePhotos[];
  floorPlans: string[];
  houseFacts: IResponseHouseFacts;
  interiorDetails: IResponseInteriorDetails;
  propertyDetails: IResponsePropertyDetails;
  recentImprovements: IResponseRecentImprovement[];
  contact: IResponseContact;
  monthlyPayment: IResponseMonthlyPayment;
  schools: IResponseSchool[];
  propertyPriceEvaluation: IResponsePropertyPriceEvaluation[];
  utilitiesOrGreenEnergyDetails: IResponseUtilitiesOrGreenEnergyDetails;
  plan?: IResponseSelectedPlan;
  listedBy?: IResponseListedBy;
  createdAt?: IDate;
  __v: number;
}

export const emptyIResponseProperty: IResponseProperty = {
  _id: '',
  name: '',
  photos: [],
  floorPlans: [],
  houseFacts: {
    schoolDistrict: '',
    address: {
      houseNumber: '',
      streetName: '',
      city: '',
      state: '',
      zipCode: '',
    },
    typeOfHome: '',
    description: '',
    livableSquareFootage: {
      aboveGrade: 0,
      belowGrade: 0,
      total: 0,
    },
  },
  interiorDetails: {
    remodelingAndRenovation: {
      mainBath: {
        didRemodel: false,
      },
      kitchen: {
        didRemodel: false,
      },
      roof: {
        didRemodel: false,
      },
      heatingSystem: {
        didRemodel: false,
      },
      windows: {
        didRemodel: false,
      },
    },
    bedsAndBathrooms: {
      beds: '',
      fullBaths: '',
      halfBaths: '',
    },
    kitchen: {
      counterTops: [],
      floorPlan: [],
    },
    appliances: {
      appliances: [],
      laundryFeatures: [],
    },
    flooring: {
      flooringType: [],
    },
    heating: {
      fuelType: [],
      system: [],
    },
    cooling: {
      system: [],
    },
    pool: {
      type: [],
    },
    interiorFeatures: {
      windowFeatures: '',
      interiorFeatures: [],
    },
  },
  propertyDetails: {
    parking: {
      type: '',
      offStreetSpaces: 0,
      attachedGarageSpaces: 0,
      detachedGarageSpaces: 0,
    },
    lot: {
      finishedSquareFeet: 0,
      lotSize: 0,
    },
    bedroomsAndBathrooms: {
      yearBuilt: 0,
      remodelYear: 0,
    },
  },
  recentImprovements: [],
  contact: {
    email: '',
    phoneNumber: '',
  },
  monthlyPayment: {
    principalAndInterest: 0,
    propertyTax: 0,
    homeInsurance: 0,
    hoaFees: 0,
    utilities: 0,
    total: 0,
    downPayment: 0,
  },
  schools: [],
  propertyPriceEvaluation: [],
  utilitiesOrGreenEnergyDetails: {
    electricInformation: '',
    sewerInformation: '',
    waterInformation: '',
    utilitiesForProperty: [],
  },
  __v: 0,
};

export interface IFetchPropertiesSuccess {
  success: boolean;
  items: IProperty[];
}

export const convertFromResponsePropertyToUIProperty = (
  response: IResponseProperty
): IProperty => {
  let evaluationStatus: IEvaluationStatus = '';
  const pricePoints = response.plan?.pricePoints || [];
  if (pricePoints.length > 0) {
    const pricePoint = pricePoints[0];
    const currentDate = moment();
    const startDate = moment(pricePoint.startDate);
    const endDate = moment(pricePoint.endDate);
    if (currentDate.isBefore(startDate)) {
      evaluationStatus = 'Not Started';
    } else if (
      currentDate.isAfter(startDate) &&
      currentDate.isBefore(endDate)
    ) {
      evaluationStatus = 'In Progress';
    } else {
      evaluationStatus = 'Completed';
    }
  }
  return {
    id: response._id,
    name: response.name,
    dateAdded: response.createdAt
      ? moment(response.createdAt).format('MMM DD, YYYY')
      : '',
    location: response.houseFacts.address.city,
    type: '',
    evaluationStatus,
    value: '',
    soldPrice: '',
    spread: '',
  };
};
export interface IFetchPropertySuccess {
  success: boolean;
  data: IResponseProperty;
}
export interface IResponseSuccess {
  success: boolean;
  data?: string;
}
