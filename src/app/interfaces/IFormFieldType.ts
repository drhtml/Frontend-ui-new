import * as _ from 'lodash';

export type ICheckboxGroupFormField = { [name: string]: boolean };
export type IFileFormField = {
  id: string;
  url: string;
  file: File | null;
  name?: string;
  nameWithExtension?: string;
};

export const fromICheckboxGroupFormFieldToRequest = (
  formValue: ICheckboxGroupFormField
): string[] => {
  const result = _.omitBy(formValue || {}, (value, key) => value !== true);
  return _.keys(result);
};

export const fromResponseToICheckboxGroupFormField = (
  response: string[]
): ICheckboxGroupFormField => {
  return _.fromPairs(_.map(response, (i) => [i, true]));
};
