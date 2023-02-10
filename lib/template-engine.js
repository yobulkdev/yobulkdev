import {
  STRING_DATA_TYPE,
  DATE_DATA_TYPE,
  EMAIL_CHECK_TYPE,
  DATE_CHECK_TYPE,
  DATETIME_DATA_TYPE,
  NUMBER_DATA_TYPE,
  BOOLEAN_DATA_TYPE,
  THREE_DIGIT_CHECK_TYPE,
  NO_GMAIL_CHECK_TYPE,
  EMAIL_DATA_TYPE,
  PHONE_NUMBER_CHECK_TYPE,
  BOOLEAN_FORMAT,
  THREE_DIGIT_NUMBER_FORMAT,
  NO_GMAIL_FORMAT,
  DATE_TIME_FORMAT,
  PHONE_NUMBER_FORMAT,
} from '../constants';

const getStringDataTypeSchema = ({ column }) => {
  switch (column.custom_validation) {
    case PHONE_NUMBER_CHECK_TYPE:
      return { type: 'string', format: PHONE_NUMBER_FORMAT };
    case NO_GMAIL_CHECK_TYPE:
      return { type: 'string', format: NO_GMAIL_FORMAT };
    case DATE_CHECK_TYPE:
      return { type: 'string', format: DATE_TIME_FORMAT };
    default:
      if (column.pattern) {
        return { type: 'string', pattern: column.pattern };
      }
      return { type: 'string' };
  }
};

const getEmailDataTypeSchema = ({ column }) => {
  switch (column.custom_validation) {
    case NO_GMAIL_CHECK_TYPE:
      return { type: 'string', format: NO_GMAIL_FORMAT };
    default:
      if (column.pattern) {
        return { type: 'string', pattern: column.pattern };
      }
      return { type: 'string', format: 'email' };
  }
};

const getNumberDataTypeSchema = ({ column }) => {
  switch (column.custom_validation) {
    case THREE_DIGIT_CHECK_TYPE:
      return { type: 'integer', format: THREE_DIGIT_NUMBER_FORMAT };
    default:
      if (column.pattern) {
        return { type: 'integer', pattern: column.pattern };
      }
      return { type: 'integer' };
  }
};

const generateSchema = (columns) => {
  let keyObj = {};
  let requiredColumns = [];
  let customMessages = {};
  for (let i = 0; i < columns.length; i++) {
    let colSchema;
    switch (columns[i].data_type.toUpperCase()) {
      case STRING_DATA_TYPE:
        colSchema = getStringDataTypeSchema({ column: columns[i] });
        break;
      case DATE_DATA_TYPE || DATETIME_DATA_TYPE:
        colSchema = { type: 'string', format: 'custom-date-time' };
        break;
      case NUMBER_DATA_TYPE:
        colSchema = getNumberDataTypeSchema({ column: columns[i] });
        break;
      case EMAIL_DATA_TYPE:
        colSchema = getEmailDataTypeSchema({ column: columns[i] });
        break;
      case BOOLEAN_DATA_TYPE:
        colSchema = { type: 'string', format: 'custom-boolean' };
        break;
      default:
        if (columns[i].pattern) {
          colSchema = { type: 'string', pattern: columns[i].pattern };
        } else {
          colSchema = { type: 'string' };
        }
        break;
    }
    if (columns[i].is_required === true) {
      requiredColumns.push(columns[i].label);
    }

    let key = columns[i].label;
    keyObj[key] = colSchema;

    if (columns[i].custom_message) {
      customMessages[key] = columns[i].custom_message;
    }
  }
  return {
    type: 'object',
    properties: keyObj,
    required: requiredColumns,
    errorMessage: {
      properties: customMessages,
    },
    additionalProperties: false,
  };
};

export default generateSchema;
