import moment from 'moment';

const customDateTime = (dateTimeString) => {
  let onlyDigits = new RegExp('^\\d+$');

  if (onlyDigits.test(dateTimeString)) {
    return false;
  } else {
    let inputDate = moment(dateTimeString);
    let someDateString = moment().format('DD/MM/YYYY');
    let someDate = moment(someDateString, 'DD/MM/YYYY');
    let result = inputDate.isValid() || someDate.isValid();
    return result;
  }
};

const customBoolean = (value) => {
  var value = String(value);
  if (
    value === 'True' ||
    value === 'False' ||
    value === 'true' ||
    value === 'false' ||
    value === '0' ||
    value === '1' ||
    value === 'T' ||
    value === 'F' ||
    value === 'Yes' ||
    value === 'No' ||
    value === 'yes' ||
    value === 'no' ||
    value === 'Y' ||
    value === 'N' ||
    value === 'On' ||
    value === 'Off' ||
    value === 'on' ||
    value === 'off' ||
    value === 'Up' ||
    value === 'Down' ||
    value === 'up' ||
    value === 'down'
  ) {
    return true;
  } else {
    return false;
  }
};

const customEmailDomain = (emailDomain) => {
  let regex = new RegExp(`[a-z0-9]+@${emailDomain}`);
  return regex.test(emailDomain);
};
const validateEmail = (mail) => {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    'gm'
  );
  if (emailRegex.test(mail)) {
    return true;
  }
  return false;
};

const validInternationalPhoneNumber = (inputtxt) => {
  let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (inputtxt.value.match(phoneno)) {
    return true;
  } else {
    return false;
  }
};
const customNoGmailDomain = (emailDomain) => {
  let regex = new RegExp(`[a-zA-Z0-9_.]+@gmail.com`);
  return validateEmail(emailDomain) && !regex.test(emailDomain);
};

const customThreeDigitNumber = (number) => {
  return number < 1000;
};

export {
  customDateTime,
  customBoolean,
  customEmailDomain,
  customThreeDigitNumber,
  customNoGmailDomain,
  validateEmail,
  validInternationalPhoneNumber,
};
