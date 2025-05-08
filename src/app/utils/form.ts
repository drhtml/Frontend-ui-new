import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as _ from 'lodash';
import { isNumber } from './string';

export const clearFormArray = (formArray: FormArray) => {
  while (formArray.length !== 0) {
    formArray.removeAt(0);
  }
};

export function getErrorMessage(
  formControl: FormControl,
  formErrorMessage: string
): string {
  if (!formControl.dirty && !formControl.touched) {
    return '';
  }
  if (formControl.errors?.['email']) {
    return 'Invalid email.';
  }
  if (formControl.errors?.['required']) {
    return 'Field is required.';
  }
  if (formControl.errors?.['phoneNumber']) {
    return 'Invalid phone number.';
  }
  if (formControl.errors?.['isNumber']) {
    return 'Invalid number.';
  }
  if (formControl.errors?.['custom']) {
    return formControl.errors?.['custom'].message;
  }
  if (formErrorMessage) {
    return formErrorMessage;
  }
  return '';
}

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    if (!/[- +()0-9]+/.test(control.value)) {
      return {
        phoneNumber: true,
      };
    }

    return null;
  };
}

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    if (!isNumber(control.value)) {
      return {
        isNumber: true,
      };
    }

    return null;
  };
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  matchError: string[] | undefined = undefined;

  constructor(error?: string[]) {
    this.matchError = error;
  }
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    if (this.matchError) {
      let hasError = false;
      _.forEach(this.matchError, (errorKey) => {
        if (control && control.parent && control.parent.hasError(errorKey)) {
          hasError = true;
        }
      });
      if (hasError && control?.touched) {
        return true;
      } else {
        return false;
      }
    }
    const invalidCtrl = !!(control?.parent?.invalid && control?.touched);

    return invalidCtrl;
  }
}

export const getControl = (form: FormControl | FormGroup, key: string) => {
  return form.get(key) as FormControl;
};

export const getArrayControl = (form: FormControl | FormGroup, key: string) => {
  return form.get(key) as FormArray;
};
