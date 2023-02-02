import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const schema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      maxlength: 3,
      format: 'first-name-validation',
      validate: (x) => (x.startsWith('chinm') ? true : false),
    },
    email: { type: 'string', format: 'email' },
    dob: { type: 'string', format: 'date' },
    countryCode: {
      type: 'string',
      enum: ['US', 'CA'],
    },
  },
  required: ['firstName', 'email', 'dob', 'countryCode'],
};

const processEachColumn = ({ templateObj, colObj }) => {
  if (Object.keys(colObj).some((el) => el == 'validate')) {
    templateObj.validators.push({
      name: colObj['format'],
      valFunc: colObj['validate'],
    });

    delete colObj['validate'];
  } else {
    return colObj;
  }
};

const schemaGenerator = ({ clonedSchema }) => {
  let templateObj = {};
  let clonedSchemaProps = clonedSchema.properties;
  templateObj.validators = [];
  Object.keys(clonedSchemaProps).forEach((k, idx) => {
    processEachColumn({ templateObj, colObj: clonedSchemaProps[k] });
  });
  templateObj.schema = {};
  Object.assign(templateObj.schema, clonedSchema);
  return templateObj;
};

//https://ajv.js.org/packages/ajv-errors.html#usage

const ajvCompileCustomValidator = ({ template }) => {
  const ajv = new Ajv({ allErrors: false, coerceTypes: true });
  addFormats(ajv, ['date', 'email']);
  template.validators?.map((el) => {
    ajv.addFormat(el.name, eval(el.valFunc));
  });
  return ajv;
};

export { schemaGenerator, ajvCompileCustomValidator };
