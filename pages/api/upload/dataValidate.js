import { ajvCompileCustomValidator } from '../../../lib/validation_util/yovalidator';

const dataValidate = ({ data, colSchema }) => {
  let ajv = ajvCompileCustomValidator({ template: colSchema });
  const result = ajv.validate(colSchema.schema, data);
  if (result) {
    data.validationData = [];
    return data;
  } else {
    var errorData = ajv.errors;
    var outArray = [];
    for (var i = 0; i < errorData.length; i++) {
      var obj = {};
      obj.key = errorData[i].instancePath.replace('/', '');
      obj.error_message = errorData[i].message;
      outArray.push(obj);
    }
    data.validationData = outArray;
    return data;
  }
};

async function transformer({ data, transformArrSchema }) {
  let transformedData = { ...data };
  let importingColumns = [];
  transformArrSchema.map((eachTransform) => {
    importingColumns.push(eachTransform.label);
    if (eachTransform.label != eachTransform.key) {
      transformedData[eachTransform.label] = transformedData[eachTransform.key];
      delete transformedData[eachTransform.key];
    }
    /*  if (eachTransform.data_type.toUpperCase() === BOOLEAN_DATA_TYPE) {
      if (
        transformedData[eachTransform.label] === true ||
        transformedData[eachTransform.label] === false ||
        transformedData[eachTransform.label] === 1 ||
        transformedData[eachTransform.label] === 0
      ) {
        transformedData[eachTransform.label] = String(
          transformedData[eachTransform.label]
        );
      }
    } */
  });

  let returnObj = {};
  importingColumns.forEach((el) => {
    returnObj[el] = transformedData[el];
  });
  return returnObj;
}

export { dataValidate, transformer };
