const CYRILIC = /^[А-Яа-я]+(-[А-Яа-я]+)?$/;
const LATIN = /^[A-Za-z]+(-[A-Za-z]+)?$/;
const FOUR_DIGITS = /^\d{4}$/;
const SIX_DIGITS = /^\d{6}$/;
const ONLY_DIGITS = /^\d+$/;
const EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const DATE = /^[0-3][0-9]\.[01][0-9]\.[12][09][0-9][0-9]$/;

export function isCyrilicText(text) {
  return text === '' || CYRILIC.test(text);
}

export function isLatinText(text) {
  return text === '' || LATIN.test(text);
}

export function isFourDigits(text) {
  return text === '' || FOUR_DIGITS.test(text);
}

export function isSixDigits(text) {
  return text === '' || SIX_DIGITS.test(text);
}

export function isOnlyDigits(text) {
  return text === '' || ONLY_DIGITS.test(text);
}

export function isEmail(text) {
  return text === '' || EMAIL.test(text);
}

export function isDate(text) {
  return text === '' || DATE.test(text);
}
export function isNotGreaterNow(string) {
  const [givenYear, givenManth, givenMonthDay] = string.split('.').reverse();
  const givenDate = new Date(
    givenYear,
    givenManth - 1,
    givenMonthDay
  ).getTime();
  const currentDate = Date.now();
  return givenDate < currentDate;
}
