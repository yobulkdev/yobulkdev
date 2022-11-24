const customDateTime = (dateTimeString) => {
  var valid = new Date(dateTimeString).getTime() > 0;
  return valid;
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
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
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
