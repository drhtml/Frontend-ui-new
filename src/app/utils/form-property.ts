import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { propTypes } from '../constant/propTypes';
import { IParkingType } from '../interfaces/backendResponse/IParkingType';
import { IFormPriceEvolutionItem } from '../interfaces/IFormPriceEvolutionItem';
import { IFormRecentImprovementItem } from '../interfaces/IFormRecentImprovementItem';
import { IFormSchoolItem } from '../interfaces/IFormSchoolItem';
import { IPropertyInfo } from '../interfaces/IPropertyDetail';
import { getControl, numberValidator, phoneNumberValidator } from './form';
import { convertStringToNumber, isNumber } from './string';

export const createEmptyPropertyForm = () => {
  const form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    addressHouseNumber: new FormControl('', [Validators.required]),
    addressStreetName: new FormControl('', [Validators.required]),
    addressCity: new FormControl('', [Validators.required]),
    addressState: new FormControl('', [Validators.required]),
    addressZip: new FormControl('', [Validators.required]),

    schoolDistrict: new FormControl('', [Validators.required]),
    describeYourHouse: new FormControl('', [Validators.required]),
    beds: new FormControl('', [Validators.required, numberValidator()]),
    bathsfull: new FormControl('', [Validators.required, numberValidator()]),
    bathspartial: new FormControl('', [Validators.required, numberValidator()]),
    countertops: new FormControl({}),
    floorplan: new FormControl({}),
    appliancesIncluded: new FormControl({}),
    laundryFeatures: new FormControl({}),
    flooringType: new FormControl({}),
    heatingtype: new FormControl({}),
    heatingsystem: new FormControl({}),
    coolingtype: new FormControl({}),
    pool: new FormControl({}),
    windowFeatures: new FormControl(''),
    interiorFeatures: new FormControl({}),
    livingsize: new FormControl(),
    lotSize: new FormControl(),
    yearbuilteffective: new FormControl(),
    remodelYear: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      phoneNumberValidator(),
    ]),
    disclosureTerms: new FormControl(false),
    schools: new FormArray(
      [] as IFormSchoolItem[]
    ) as FormArray<IFormSchoolItem>,
    priceEvolution: new FormArray(
      [] as IFormPriceEvolutionItem[]
    ) as FormArray<IFormPriceEvolutionItem>,
    recentImprovements: new FormArray(
      [] as IFormRecentImprovementItem[]
    ) as FormArray<IFormRecentImprovementItem>,
    photos: new FormControl([]),
    floorPlans: new FormControl([]),

    electricInformation: new FormControl(''),
    sewerInformation: new FormControl(''),
    waterInformation: new FormControl(''),
    utilitiesForProperty: new FormControl(),

    principalAndInterest: new FormControl(),
    propertyTax: new FormControl(),
    homeInsurance: new FormControl(),
    HOAFees: new FormControl(),
    utilities: new FormControl(),
    totalDue: new FormControl(),
    downPaymentAtClose: new FormControl(),
    selectedPlan: new FormControl(),

    cardholderName: new FormControl(),
    cardNumber: new FormControl(),
    expiredDate: new FormControl(),
    ccv: new FormControl(),
    saveMyPayment: new FormControl(),

    typeOfHome: new FormControl('', [Validators.required]),
    aboveGrade: new FormControl(null, [Validators.required, numberValidator()]),
    belowGrade: new FormControl(null, [Validators.required, numberValidator()]),
    totalGrade: new FormControl(null),
    parkingType: new FormControl('', [Validators.required]),

    remodelingRenovations: new FormControl({}),
  });

  handleDynamicPropertyForm(form);
  return form;
};

function updateTotalGrade(form: FormControl | FormGroup) {
  const aboveGrade = getControl(form, 'aboveGrade').value;
  const belowGrade = getControl(form, 'belowGrade').value;
  let aboveGradeNumber: number | null = null;
  let belowGradeNumber: number | null = null;
  if (isNumber(aboveGrade)) {
    aboveGradeNumber = convertStringToNumber(aboveGrade);
  }
  if (isNumber(belowGrade)) {
    belowGradeNumber = convertStringToNumber(belowGrade);
  }
  if (aboveGradeNumber !== null || belowGradeNumber !== null) {
    getControl(form, 'totalGrade').setValue(
      (aboveGradeNumber || 0) + (belowGradeNumber || 0)
    );
  } else {
    getControl(form, 'totalGrade').setValue(null);
  }
}

export const updateParkingTypeField = (
  value: IParkingType,
  form: FormControl | FormGroup
) => {
  if (value === 'off_street' && !getControl(form, 'prkgSpaces')) {
    (form as FormGroup).addControl(
      'prkgSpaces',
      new FormControl(null, [Validators.required, numberValidator()])
    );
  } else if (value !== 'off_street' && getControl(form, 'prkgSpaces')) {
    (form as FormGroup).removeControl('prkgSpaces');
  }
  if (value === 'garage' && !getControl(form, 'attachedNumberOfSpaces')) {
    (form as FormGroup).addControl(
      'attachedNumberOfSpaces',
      new FormControl(null, [Validators.required, numberValidator()])
    );
    (form as FormGroup).addControl(
      'detachedNumberOfSpaces',
      new FormControl(null, [Validators.required, numberValidator()])
    );
  } else if (value !== 'garage' && getControl(form, 'attachedNumberOfSpaces')) {
    (form as FormGroup).removeControl('attachedNumberOfSpaces');
    (form as FormGroup).removeControl('detachedNumberOfSpaces');
  }
};

export const handleDynamicPropertyForm = (form: FormControl | FormGroup) => {
  getControl(form, 'parkingType').valueChanges.subscribe(
    (value: IParkingType) => {
      updateParkingTypeField(value, form);
    }
  );

  getControl(form, 'aboveGrade').valueChanges.subscribe(() => {
    updateTotalGrade(form);
  });

  getControl(form, 'belowGrade').valueChanges.subscribe(() => {
    updateTotalGrade(form);
  });

  getControl(form, 'remodelingRenovations').valueChanges.subscribe(
    (remodelingRenovations) => {
      if (
        !!remodelingRenovations['Main Bath'] &&
        !getControl(form, 'yearRenovatedMainPath')
      ) {
        (form as FormGroup).addControl(
          'yearRenovatedMainPath',
          new FormControl('')
        );
      } else if (
        !remodelingRenovations['Main Bath'] &&
        !!getControl(form, 'yearRenovatedMainPath')
      ) {
        (form as FormGroup).removeControl('yearRenovatedMainPath');
      }
      if (
        !!remodelingRenovations['Kitchen'] &&
        !getControl(form, 'yearRenovatedKitchen')
      ) {
        (form as FormGroup).addControl(
          'yearRenovatedKitchen',
          new FormControl('')
        );
      } else if (
        !remodelingRenovations['Kitchen'] &&
        !!getControl(form, 'yearRenovatedKitchen')
      ) {
        (form as FormGroup).removeControl('yearRenovatedKitchen');
      }
      if (
        !!remodelingRenovations['Roof'] &&
        !getControl(form, 'yearRenovatedRoof')
      ) {
        (form as FormGroup).addControl(
          'yearRenovatedRoof',
          new FormControl('')
        );
      } else if (
        !remodelingRenovations['Roof'] &&
        !!getControl(form, 'yearRenovatedRoof')
      ) {
        (form as FormGroup).removeControl('yearRenovatedRoof');
      }
      if (
        !!remodelingRenovations['Heating System'] &&
        !getControl(form, 'yearRenovatedHeatingSystem')
      ) {
        (form as FormGroup).addControl(
          'yearRenovatedHeatingSystem',
          new FormControl('')
        );
      } else if (
        !remodelingRenovations['Heating System'] &&
        !!getControl(form, 'yearRenovatedHeatingSystem')
      ) {
        (form as FormGroup).removeControl('yearRenovatedHeatingSystem');
      }
      if (
        !!remodelingRenovations['Windows'] &&
        !getControl(form, 'yearRenovatedWindows')
      ) {
        (form as FormGroup).addControl(
          'yearRenovatedWindows',
          new FormControl('')
        );
      } else if (
        !remodelingRenovations['Windows'] &&
        !!getControl(form, 'yearRenovatedWindows')
      ) {
        (form as FormGroup).removeControl('yearRenovatedWindows');
      }
    }
  );

  getControl(form, 'pool').valueChanges.subscribe((pool) => {
    if (!!pool['Have Pool'] && !getControl(form, 'poolInAboveGround')) {
      (form as FormGroup).addControl('poolInAboveGround', new FormControl({}));
    } else {
      (form as FormGroup).removeControl('poolInAboveGround');
    }
  });
};

export const updatePropertyFormInfo = (
  form: FormControl | FormGroup,
  propertyInfo?: IPropertyInfo
) => {
  if (!propertyInfo) {
    return;
  }
  const beds = propertyInfo.building?.rooms?.beds;
  if (beds) {
    getControl(form, 'beds').setValue(beds);
  }
  const bathsfull = propertyInfo.building?.rooms?.bathsfull;
  if (bathsfull) {
    getControl(form, 'bathsfull').setValue(bathsfull);
  }
  const bathspartial = propertyInfo.building?.rooms?.bathspartial;
  if (bathspartial) {
    getControl(form, 'bathspartial').setValue(bathspartial);
  }
  const yearbuilteffective = propertyInfo.building?.summary?.yearbuilteffective;
  if (yearbuilteffective) {
    getControl(form, 'yearbuilteffective').setValue(yearbuilteffective);
  }
  const prkgType = propertyInfo.building?.parking?.prkgType;
  const prkgSpaces = propertyInfo.building?.parking?.prkgSpaces;
  if (prkgType) {
    if (prkgType.toLowerCase().startsWith('garage')) {
      getControl(form, 'parkingType').setValue('garage');
      updateParkingTypeField('garage', form);
      if (prkgSpaces) {
        getControl(form, 'attachedNumberOfSpaces').setValue(prkgSpaces);
        getControl(form, 'detachedNumberOfSpaces').setValue(0);
      }
    }
  }

  let proptype = propertyInfo.summary?.proptype;
  if (proptype) {
    const mappingValue = _.find(propTypes, { value: proptype });
    if (mappingValue) {
      getControl(form, 'typeOfHome').setValue(mappingValue.key);
    }
  }

  let coolingtype = propertyInfo.utilities?.coolingtype;
  const coolingTypeMapping: { [key: string]: string } = {
    CENTRAL: 'central_air',
  };
  if (coolingtype && !!coolingTypeMapping[coolingtype]) {
    getControl(form, 'coolingtype').setValue({
      [coolingTypeMapping[coolingtype]]: true,
    });
  }

  let heatingfuel = propertyInfo.utilities?.heatingfuel;
  const heatingfuelMapping: { [key: string]: string } = {
    GAS: 'gas',
  };
  if (heatingfuel && !!heatingfuelMapping[heatingfuel]) {
    getControl(form, 'heatingtype').setValue({
      [heatingfuelMapping[heatingfuel]]: true,
    });
  }

  let heatingtype = propertyInfo.utilities?.heatingtype;
  const heatingtypeMapping: { [key: string]: string } = {
    'FORCED AIR': 'hot_air',
  };
  if (heatingtype && !!heatingtypeMapping[heatingtype]) {
    getControl(form, 'heatingsystem').setValue({
      [heatingtypeMapping[heatingtype]]: true,
    });
  }

  const livingsize = propertyInfo.building?.size?.livingsize;
  if (_.isNumber(livingsize)) {
    getControl(form, 'aboveGrade').setValue(livingsize);
  }

  const bsmtsize = propertyInfo.building?.interior?.bsmtsize;
  if (_.isNumber(bsmtsize)) {
    getControl(form, 'belowGrade').setValue(bsmtsize);
  }

  const groundfloorsize = propertyInfo.building?.size?.groundfloorsize;
  const grosssize = propertyInfo.building?.size?.grosssize;
  if (groundfloorsize && grosssize) {
    getControl(form, 'aboveGrade').setValue(groundfloorsize);
    getControl(form, 'belowGrade').setValue(grosssize - groundfloorsize);
    getControl(form, 'totalGrade').setValue(grosssize);
  }
};
