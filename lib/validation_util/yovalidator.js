import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { customBoolean, customDateTime } from '../validation-engine';

const processEachColumn = ({ templateObj, colObj }) => {
  if (Object.keys(colObj).some((el) => el == 'validate')) {
    templateObj.validators.push({
      name: colObj['format'],
      valFunc: colObj['validate'],
    });

    // delete colObj['validate'];
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
  const ajv = new Ajv({ allErrors: true, coerceTypes: true });
  addFormats(ajv, ['date', 'email']);
  require('ajv-errors')(ajv);

  ajv.addFormat('custom-date-time', customDateTime);
  ajv.addFormat('custom-boolean', customBoolean);
  template.validators?.map((el) => {
    ajv.addFormat(el.name, eval(el.valFunc));
  });
  return ajv;
};

export { schemaGenerator, ajvCompileCustomValidator };
