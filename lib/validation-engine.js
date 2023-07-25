import moment from 'moment';

const customDateTime = (dateTimeString) => {
  let onlyDigits = new RegExp('^\\d+$');

  if (onlyDigits.test(dateTimeString)) {
    return false;
  } else {
    let allowedDateFormats = [
      'DD/MM/YYYY',
      'DD/MM/YY',
      'DD-MM-YYYY',
      'DD-MM-YY',
      'DD.MM.YYYY',
      'DD.MM.YY',
      'YYYY-MM-DD',
      'MM/DD/YYYY',
      'MM/DD/YY',
      'MM-DD-YYYY',
      'MM-DD-YY',
      'D/M/YYYY',
      'MM.DD.YYYY',
      'D.M.YYYY',
      'DD. MM. YYYY',
      'D. M. YYYY',
      'YYYY-MM-DD',
      'DD-MM-YYYY',
      'MM/DD/YYYY',
      'MM/DD/YY',
      'DD/MM/YY',
      'YY-MM-DD',
      'DD-MM-YY',
      'MM/DD/YYYY hh:mm:ss',
      'MM/DD/YYYY hh:mm:ss A',
      'MM/DD/YYYY hh:mm',
      'MM/DD/YYYY hh:mm A',
      'DD-MM-YYYY hh:mm:ss',
      'DD-MM-YYYY hh:mm:ss A',
      'DD-MM-YYYY hh:mm',
      'DD-MM-YYYY hh:mm A',
      'YYYY-MM-DD hh:mm:ss',
      'YYYY-MM-DD hh:mm:ss A',
      'YYYY-MM-DD hh:mm',
      'YYYY-MM-DD hh:mm A',
      'DD/MM/YYYY hh:mm:ss',
      'DD/MM/YYYY hh:mm:ss A',
      'DD/MM/YYYY hh:mm',
      'DD/MM/YYYY hh:mm A',
      'MM-DD-YYYY hh:mm:ss',
      'MM-DD-YYYY hh:mm:ss A',
      'MM-DD-YYYY hh:mm',
      'MM-DD-YYYY hh:mm A',
      'YYYY/MM/DD hh:mm:ss',
      'YYYY/MM/DD hh:mm:ss A',
      'YYYY/MM/DD hh:mm',
      'YYYY/MM/DD hh:mm A',
      'MM-DD-YYYY',
      'YYYY/MM/DD',
      'DD/MM/YYYY',
      "MMM D, YYYY"
    ];
    
    return (
      moment(dateTimeString, allowedDateFormats, true).isValid() ||
      moment(dateTimeString).isValid()
    );
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
