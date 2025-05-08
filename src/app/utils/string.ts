import * as _ from 'lodash';
import * as moment from 'moment';
import 'moment-duration-format';

export const lpad = (
  string: string,
  length: number,
  padString: string = '0'
) => {
  let str = string;
  while (str.length < length) str = padString + str;
  return str;
};

export const isNumber = (value: string | number): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  if (_.isNumber(value)) {
    return true;
  }
  if (value.match(/^-?\d+$/)) {
    return true;
  } else if (value.match(/^\d+\.\d+$/)) {
    return true;
  }

  return false;
};

export const convertStringToNumber = (
  value: string,
  defaultValue = 0
): number => {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  if (_.isNumber(value)) {
    return value;
  }
  if (value && value.match(/^-?\d+$/)) {
    return parseInt(value);
  } else if (value && value.match(/^\d+\.\d+$/)) {
    return parseFloat(value);
  }

  return defaultValue;
};

// camel case string examples: bigAnimal, electricBaseboard
export const convertCamelCaseTextToTitleCaseText = (text: string) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

// snake case string examples: big_animal, electric_baseboard
export const convertSnakeCaseTextToTitleCaseText = (text: string) => {
  const finalResult = text
    .split('_')
    .filter((x) => x.length > 0)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');
  return finalResult;
};

export const ordinalSuffixOf = (i: number) => {
  const j = i % 10;
  const k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
};

export const getFileNameWithExtension = (file: string) => {
  const segments = (file || '').split('/');
  const lastPart = segments[segments.length - 1];
  return lastPart;
};

export const getFileNameWithoutExtension = (file: string) => {
  const lastPart = getFileNameWithExtension(file);
  return lastPart.split('.')[0];
};

export const formatPrice = (price: string) => {
  if (!price) {
    return price;
  }
  return `$${parseFloat(price).toLocaleString('en')}`;
};

export const nFormatter = (num: number, digits = 1) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

const HOUR_MS = 60 * 60 * 1000;
export const formatLastLoginMinute = (date: moment.Moment) : string => {
  const currentTime = moment();
  let timeLeft = currentTime.diff(date);

  let format;
  if (timeLeft > HOUR_MS) format = 'H [hour]';
  else format = 'm[min]';

  return moment.duration(timeLeft).format(format);
}

export const formatLastLogin = (date: string) : string => {
  if (!date) {
    return '';
  }
  const momentDate = moment(date)
  if (momentDate.isSame(new Date(), "day")) {
    return `Today, ${momentDate.format('h:mm A')} | ${formatLastLoginMinute(momentDate)}`
  }

  return momentDate.format('lll')
}