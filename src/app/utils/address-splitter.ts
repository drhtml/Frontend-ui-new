// http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844#1830844
function isNumber(n: string | number) {
  return !isNaN(parseFloat(n as string)) && isFinite(n as number);
}

// Check if character is a fraction, e.g. ¼
function isFractionalChar(n: string) {
  const c = n.charCodeAt(0);
  return (c >= 188 && c <= 190) || (c >= 8531 && c <= 8542);
}

// return the first fractional character in a string
// return false if there is none
// Could easily return the index of the character, but this creates a parallelism with RegExp.exec
function indexFractionalChar(m: string) {
  const a = m.split('');
  let i: string;
  for (i in a) {
    if (isFractionalChar(a[i])) return i;
  }

  return false;
}

/**
 * Splits an address into the number and street part.
 * with input: "100 Main Street", outputs: {number: "100", space: ' ', street: "Main Street"}
 * The special sauce is handling fractional addresses.
 * With input "22½ Baker Street", outputs: {number: "22½", space: ' ', street: "Baker Street"}
 *
 * @param string x An address with leading number
 * @return Object An object with the number, street and a space, for inserting between.
 * The space parameter is useful for situations where you want to glue the pieces back together for a user.
 * If user inputs "Main Street", without a number, .space is returned empty, so you don't have to bother testing
 * and just glue it like: x.number + x.space + x.street
 * while processing x.number and x.street separately on the back end.
 */
export function splitAddress(x: string) {
  let a = x.trim().split(' ');
  let number;
  let street;

  if (a.length <= 1) return { number: '', space: '', street: a.join('') };

  if (isNumber(a[0].substr(0, 1)) || isFractionalChar(a[0].substr(0, 1))) {
    number = a.shift();
  } else {
    // If there isn't a leading number, just return the trimmed input as the street
    return { number: '', space: '', street: x.trim() };
  }
  if (/[0-9]\/[0-9]/.exec(a[0]) || indexFractionalChar(a[0]) !== false)
    number += ' ' + a.shift();

  return { number: number, space: ' ', street: a.join(' ') };
}
