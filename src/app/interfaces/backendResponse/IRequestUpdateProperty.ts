import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import { convertStringToNumber } from 'src/app/utils/string';
import {
  fromICheckboxGroupFormFieldToRequest,
  fromResponseToICheckboxGroupFormField,
} from '../IFormFieldType';
import { IFormPropertyDetail } from '../IFormPropertyDetail';
import {
  IResponseHouseFacts,
  IResponseInteriorDetails,
  IResponsePropertyDetails,
  IResponseContact,
  IResponseProperty,
  IResponsePhotos,
} from './IResponseProperty';
import { updateParkingTypeField } from 'src/app/utils/form-property';

export interface IRequestRecentImprovement {
  type: string;
  description: string;
  date: Date;
}

export interface IRequestUpdateProperty {
  name: string;
  floorPlans: string[];
  houseFacts: IResponseHouseFacts;
  interiorDetails: IResponseInteriorDetails;
  propertyDetails: IResponsePropertyDetails;
  recentImprovements: IRequestRecentImprovement[];
  contact: IResponseContact;
}

export const emptyIRequestUpdateProperty: IRequestUpdateProperty = {
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
};

export const updateIRequestUpdatePropertyFromFormData = (
  requestProperty: IRequestUpdateProperty,
  inputForm: IFormPropertyDetail
) => {
  requestProperty.name = inputForm.name || '';
  requestProperty.houseFacts.address = {
    houseNumber: inputForm.addressHouseNumber || '',
    streetName: inputForm.addressStreetName || '',
    city: inputForm.addressCity || '',
    state: inputForm.addressState || '',
    zipCode: inputForm.addressZip || '',
  };
  requestProperty.houseFacts.schoolDistrict = inputForm.schoolDistrict;
  requestProperty.houseFacts.description = inputForm.describeYourHouse || '';
  requestProperty.interiorDetails.bedsAndBathrooms.beds = inputForm.beds || '';
  requestProperty.interiorDetails.bedsAndBathrooms.fullBaths =
    inputForm.bathsfull || '';
  requestProperty.interiorDetails.bedsAndBathrooms.halfBaths =
    inputForm.bathspartial || '';
  requestProperty.interiorDetails.kitchen.counterTops =
    fromICheckboxGroupFormFieldToRequest(inputForm.countertops);
  requestProperty.interiorDetails.kitchen.floorPlan =
    fromICheckboxGroupFormFieldToRequest(inputForm.floorplan);
  requestProperty.interiorDetails.appliances.appliances =
    fromICheckboxGroupFormFieldToRequest(inputForm.appliancesIncluded);
  requestProperty.interiorDetails.appliances.laundryFeatures =
    fromICheckboxGroupFormFieldToRequest(inputForm.laundryFeatures);
  requestProperty.interiorDetails.flooring.flooringType =
    fromICheckboxGroupFormFieldToRequest(inputForm.flooringType);
  requestProperty.interiorDetails.heating.fuelType =
    fromICheckboxGroupFormFieldToRequest(inputForm.heatingtype);
  requestProperty.interiorDetails.heating.system =
    fromICheckboxGroupFormFieldToRequest(inputForm.heatingsystem);
  requestProperty.interiorDetails.cooling.system =
    fromICheckboxGroupFormFieldToRequest(inputForm.coolingtype);
  requestProperty.interiorDetails.pool.type = inputForm.poolInAboveGround
    ? fromICheckboxGroupFormFieldToRequest(inputForm.poolInAboveGround)
    : [];
  requestProperty.interiorDetails.interiorFeatures.windowFeatures =
    inputForm.windowFeatures || '';
  requestProperty.interiorDetails.interiorFeatures.interiorFeatures =
    fromICheckboxGroupFormFieldToRequest(inputForm.interiorFeatures);
  requestProperty.propertyDetails.parking.type = inputForm.parkingType;
  requestProperty.propertyDetails.parking.offStreetSpaces =
    inputForm.prkgSpaces || 0;
  requestProperty.propertyDetails.parking.attachedGarageSpaces =
    inputForm.attachedNumberOfSpaces || 0;
  requestProperty.propertyDetails.parking.detachedGarageSpaces =
    inputForm.detachedNumberOfSpaces || 0;
  requestProperty.propertyDetails.lot.finishedSquareFeet =
    convertStringToNumber(inputForm.livingsize);
  requestProperty.propertyDetails.lot.lotSize = convertStringToNumber(
    inputForm.lotSize
  );
  requestProperty.propertyDetails.bedroomsAndBathrooms.yearBuilt =
    convertStringToNumber(inputForm.yearbuilteffective);
  requestProperty.propertyDetails.bedroomsAndBathrooms.remodelYear =
    convertStringToNumber(inputForm.remodelYear);
  requestProperty.recentImprovements = inputForm.recentImprovements.map(
    (item) => ({
      type: item.type || '',
      description: item.description || '',
      date: moment(item.date, 'MM/YYYY').toDate() || '',
    })
  );
  requestProperty.contact.email = inputForm.email || '';
  requestProperty.contact.phoneNumber = inputForm.phoneNumber || '';
  requestProperty.floorPlans = inputForm.floorPlans.map((item) => {
    return item.name || '';
  });
  requestProperty.houseFacts.typeOfHome = inputForm.typeOfHome;
  requestProperty.houseFacts.livableSquareFootage.aboveGrade =
    inputForm.aboveGrade;
  requestProperty.houseFacts.livableSquareFootage.belowGrade =
    inputForm.belowGrade;
  requestProperty.houseFacts.livableSquareFootage.total = inputForm.totalGrade;

  const remodelingRenovations = inputForm.remodelingRenovations;
  requestProperty.interiorDetails.remodelingAndRenovation = {
    mainBath: {
      didRemodel: !!remodelingRenovations['Main Bath'],
    },
    kitchen: {
      didRemodel: !!remodelingRenovations['Kitchen'],
    },
    roof: {
      didRemodel: !!remodelingRenovations['Roof'],
    },
    heatingSystem: {
      didRemodel: !!remodelingRenovations['Heating System'],
    },
    windows: {
      didRemodel: !!remodelingRenovations['Windows'],
    },
  };
  if (!!remodelingRenovations['Main Bath']) {
    requestProperty.interiorDetails.remodelingAndRenovation.mainBath.remodelYear =
      convertStringToNumber(inputForm.yearRenovatedMainPath) || 0;
  }
  if (!!remodelingRenovations['Kitchen']) {
    requestProperty.interiorDetails.remodelingAndRenovation.kitchen.remodelYear =
      convertStringToNumber(inputForm.yearRenovatedKitchen) || 0;
  }
  if (!!remodelingRenovations['Roof']) {
    requestProperty.interiorDetails.remodelingAndRenovation.roof.remodelYear =
      convertStringToNumber(inputForm.yearRenovatedRoof) || 0;
  }
  if (!!remodelingRenovations['Heating System']) {
    requestProperty.interiorDetails.remodelingAndRenovation.heatingSystem.remodelYear =
      convertStringToNumber(inputForm.yearRenovatedHeatingSystem) || 0;
  }
  if (!!remodelingRenovations['Windows']) {
    requestProperty.interiorDetails.remodelingAndRenovation.windows.remodelYear =
      convertStringToNumber(inputForm.yearRenovatedWindows) || 0;
  }
};

export const updateIResponsePropertyToFormData = (
  inputForm: IFormPropertyDetail,
  form: FormGroup<any>,
  responseProperty: IResponseProperty
) => {
  inputForm.name = responseProperty.name || '';
  inputForm.addressHouseNumber =
    responseProperty.houseFacts.address.houseNumber || '';
  inputForm.addressStreetName =
    responseProperty.houseFacts.address.streetName || '';
  inputForm.addressCity = responseProperty.houseFacts.address.city || '';
  inputForm.addressState = responseProperty.houseFacts.address.state || '';
  inputForm.addressZip = responseProperty.houseFacts.address.zipCode || '';
  inputForm.schoolDistrict = responseProperty.houseFacts.schoolDistrict;

  inputForm.address = `${inputForm.addressHouseNumber} ${inputForm.addressStreetName} ${inputForm.addressCity}, ${inputForm.addressState} ${inputForm.addressZip}`;
  inputForm.describeYourHouse = responseProperty.houseFacts.description || '';
  inputForm.beds = responseProperty.interiorDetails.bedsAndBathrooms.beds || '';
  inputForm.bathsfull =
    responseProperty.interiorDetails.bedsAndBathrooms.fullBaths || '';

  inputForm.bathspartial =
    responseProperty.interiorDetails.bedsAndBathrooms.halfBaths || '';
  inputForm.flooringType = fromResponseToICheckboxGroupFormField(
    responseProperty.interiorDetails.flooring.flooringType
  );
  inputForm.heatingtype = fromResponseToICheckboxGroupFormField(
    responseProperty.interiorDetails.heating.fuelType
  );
  inputForm.heatingsystem = fromResponseToICheckboxGroupFormField(
    responseProperty.interiorDetails.heating.system
  );
  inputForm.coolingtype = fromResponseToICheckboxGroupFormField(
    responseProperty.interiorDetails.cooling.system
  );
  if (
    responseProperty.interiorDetails.pool.type &&
    responseProperty.interiorDetails.pool.type.length
  ) {
    inputForm.pool = {
      'Have Pool': true,
    };
    inputForm.poolInAboveGround = fromResponseToICheckboxGroupFormField(
      responseProperty.interiorDetails.pool.type
    );
  }

  inputForm.parkingType = responseProperty.propertyDetails.parking.type;
  inputForm.prkgSpaces =
    responseProperty.propertyDetails.parking.offStreetSpaces || 0;
  inputForm.attachedNumberOfSpaces =
    responseProperty.propertyDetails.parking.attachedGarageSpaces || 0;
  inputForm.detachedNumberOfSpaces =
    responseProperty.propertyDetails.parking.detachedGarageSpaces || 0;
  inputForm.livingsize = `${responseProperty.propertyDetails.lot?.finishedSquareFeet}`;
  inputForm.lotSize = `${responseProperty.propertyDetails.lot?.lotSize}`;
  inputForm.yearbuilteffective = `${responseProperty.propertyDetails.bedroomsAndBathrooms?.yearBuilt}`;
  inputForm.remodelYear = `${responseProperty.propertyDetails.bedroomsAndBathrooms?.remodelYear}`;
  _.forEach(responseProperty.recentImprovements, (recentImprovement) => {
    const recentImprovementForm = new FormGroup({
      type: new FormControl(recentImprovement.type || ''),
      description: new FormControl(recentImprovement.description || ''),
      date: new FormControl(
        moment(recentImprovement.date).format('MM/YYYY') || ''
      ),
    });

    (form.get('recentImprovements') as FormArray).push(recentImprovementForm);
  });
  inputForm.email = responseProperty.contact.email || '';
  inputForm.phoneNumber = responseProperty.contact.phoneNumber || '';
  inputForm.selectedPlan = responseProperty.plan?.planId || '';
  inputForm.typeOfHome = responseProperty.houseFacts.typeOfHome;
  inputForm.aboveGrade =
    responseProperty.houseFacts.livableSquareFootage?.aboveGrade || 0;
  inputForm.belowGrade =
    responseProperty.houseFacts.livableSquareFootage?.belowGrade || 0;
  inputForm.totalGrade =
    responseProperty.houseFacts.livableSquareFootage?.total || 0;

  const remodelingAndRenovation =
    responseProperty.interiorDetails.remodelingAndRenovation;
  inputForm.remodelingRenovations = {
    'Main Bath': !!remodelingAndRenovation?.mainBath?.didRemodel,
    Kitchen: !!remodelingAndRenovation?.kitchen?.didRemodel,
    Roof: !!remodelingAndRenovation?.roof?.didRemodel,
    'Heating System': !!remodelingAndRenovation?.heatingSystem?.didRemodel,
    Windows: !!remodelingAndRenovation?.windows?.didRemodel,
  };
  inputForm.yearRenovatedMainPath = `${
    remodelingAndRenovation?.mainBath?.remodelYear || ''
  }`;
  inputForm.yearRenovatedKitchen = `${
    remodelingAndRenovation?.kitchen?.remodelYear || ''
  }`;
  inputForm.yearRenovatedRoof = `${
    remodelingAndRenovation?.roof?.remodelYear || ''
  }`;
  inputForm.yearRenovatedHeatingSystem = `${
    remodelingAndRenovation?.heatingSystem?.remodelYear || ''
  }`;
  inputForm.yearRenovatedWindows = `${
    remodelingAndRenovation?.windows?.remodelYear || ''
  }`;

  const photos: IResponsePhotos[] = [];
  const floors: IResponsePhotos[] = [];
  _.forEach(responseProperty.photos, (photo) => {
    const matchFloor =
      responseProperty.floorPlans.indexOf(photo.name || '') >= 0;
    if (matchFloor) {
      floors.push(photo);
    } else {
      photos.push(photo);
    }
  });
  inputForm.photos = photos.map((item) => {
    return {
      url: item.url || '',
      file: null,
      id: item._id,
      name: item.name,
    };
  });
  inputForm.floorPlans = floors.map((item) => {
    return {
      url: item.url || '',
      file: null,
      id: item._id,
      name: item.name,
    };
  });

  updateParkingTypeField(inputForm.parkingType, form);
  form.patchValue(inputForm);
};
