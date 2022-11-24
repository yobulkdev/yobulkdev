export const STRING_DATA_TYPE = 'STRING';
export const BOOLEAN_DATA_TYPE = 'BOOLEAN';
export const NUMBER_DATA_TYPE = 'NUMBER';
export const EMAIL_DATA_TYPE = 'EMAIL';
export const DATE_DATA_TYPE = 'DATE';
export const DATETIME_DATA_TYPE = 'DATETIME';
export const TIME_DATA_TYPE = 'TIME';
export const INT_DATA_TYPE = 'NUMBER';
export const FLOAT_DATA_TYPE = 'DATE';

export const EMAIL_CHECK_TYPE = 'EMAIL';
export const DATE_CHECK_TYPE = 'DATE';
export const THREE_DIGIT_CHECK_TYPE = 'THREE DIGITS';
export const NO_GMAIL_CHECK_TYPE = 'NO GMAIL';
export const PHONE_NUMBER_CHECK_TYPE = 'PHONE NUMBER WITH COUNTRY CODE';

export const DROPDOWN_SELECT_TEXT = 'Select ...';
export const types = {
  NUMBER: (data) => typeof data === 'number' && !isNaN(data),
  STRING: (data) => typeof data === 'string',
  DATE: (data) => typeof data === 'date',
  BOOL: (data) => typeof data === 'boolean',
  OBJECT: (data) => typeof data === 'object',
  DATETIME: (data) => typeof data === 'datetime',
  TIME: (data) => typeof data === 'time',
  INT: (data) => typeof data === 'int',
  FLOAT: (data) => typeof data === 'float',
};

/**AJV Formats */
export const PHONE_NUMBER_FORMAT = 'custom-phone-number';
export const NO_GMAIL_FORMAT = 'custom-no-gmail-policy';
export const DATE_TIME_FORMAT = 'custom-date-time';
export const THREE_DIGIT_NUMBER_FORMAT = 'custom-three-digit-num';
export const BOOLEAN_FORMAT = 'custom-boolean';
