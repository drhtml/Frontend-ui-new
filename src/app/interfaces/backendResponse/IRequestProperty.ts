import * as moment from 'moment';
import {
  convertStringToNumber,
  getFileNameWithoutExtension,
} from 'src/app/utils/string';
import { fromICheckboxGroupFormFieldToRequest } from '../IFormFieldType';
import { IFormPropertyDetail } from '../IFormPropertyDetail';
import {
  IRequestUpdateProperty,
  updateIRequestUpdatePropertyFromFormData,
} from './IRequestUpdateProperty';
import {
  IResponseMonthlyPayment,
  IResponseUtilitiesOrGreenEnergyDetails,
} from './IResponseProperty';

export interface IRequestSchool {
  name: string;
  grades: string;
  distances: string;
  overallGrade: number;
  students: string;
}

export interface IRequestPropertyPriceEvaluation {
  year: number;
  price: number;
}

export interface IRequestProperty extends IRequestUpdateProperty {
  monthlyPayment: IResponseMonthlyPayment;
  schools: IRequestSchool[];
  propertyPriceEvaluation: IRequestPropertyPriceEvaluation[];
  utilitiesOrGreenEnergyDetails: IResponseUtilitiesOrGreenEnergyDetails;
}

export const emptyIRequestProperty: IRequestProperty = {
  name: '',
  floorPlans: [],
  houseFacts: {
    address: {
      houseNumber: '',
      streetName: '',
      city: '',
      state: '',
      zipCode: '',
    },
    schoolDistrict: '',
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
};

export const updateIRequestPropertyFromFormData = (
  requestProperty: IRequestProperty,
  inputForm: IFormPropertyDetail
) => {
  updateIRequestUpdatePropertyFromFormData(requestProperty, inputForm);

  requestProperty.monthlyPayment.principalAndInterest = convertStringToNumber(
    inputForm.principalAndInterest
  );
  requestProperty.monthlyPayment.propertyTax = convertStringToNumber(
    inputForm.propertyTax
  );
  requestProperty.monthlyPayment.homeInsurance = convertStringToNumber(
    inputForm.homeInsurance
  );
  requestProperty.monthlyPayment.hoaFees = convertStringToNumber(
    inputForm.HOAFees
  );
  requestProperty.monthlyPayment.utilities = convertStringToNumber(
    inputForm.utilities
  );
  requestProperty.monthlyPayment.total = convertStringToNumber(
    inputForm.totalDue
  );
  requestProperty.monthlyPayment.downPayment = convertStringToNumber(
    inputForm.downPaymentAtClose
  );
  requestProperty.schools = inputForm.schools.map((item) => ({
    name: item.name || '',
    grades: item.grades || '',
    distances: item.distance || '',
    overallGrade: item.grade || 0,
    students: item.students || '',
  }));
  requestProperty.propertyPriceEvaluation = inputForm.priceEvolution.map(
    (item) => ({
      year: convertStringToNumber(item.year),
      price: convertStringToNumber(item.yearValue),
    })
  );
  requestProperty.utilitiesOrGreenEnergyDetails.electricInformation =
    inputForm.electricInformation || '';
  requestProperty.utilitiesOrGreenEnergyDetails.sewerInformation =
    inputForm.sewerInformation || '';
  requestProperty.utilitiesOrGreenEnergyDetails.waterInformation =
    inputForm.waterInformation || '';
  requestProperty.utilitiesOrGreenEnergyDetails.utilitiesForProperty =
    fromICheckboxGroupFormFieldToRequest(inputForm.utilitiesForProperty);
};
