import Busboy from 'busboy';
import Papa from 'papaparse';
import { nameByRace } from 'fantasy-name-generator';
import { ObjectId } from 'mongodb';
import { Transform, pipeline } from 'stream';
import StreamToMongoDB from '../../../lib/mongostream';
import clientPromise from '../../../lib/mongodb';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import {
  customDateTime,
  customBoolean,
  customThreeDigitNumber,
  customNoGmailDomain,
  validInternationalPhoneNumber,
} from '../../../lib/validation-engine';
import {
  BOOLEAN_DATA_TYPE,
  BOOLEAN_FORMAT,
  DATE_TIME_FORMAT,
  NO_GMAIL_FORMAT,
  PHONE_NUMBER_FORMAT,
  THREE_DIGIT_NUMBER_FORMAT,
} from '../../../constants';

const ajv = new Ajv({ allErrors: true });
require('ajv-errors')(ajv);
addFormats(ajv, ['date', 'email']);
ajv.addFormat(DATE_TIME_FORMAT, customDateTime);
ajv.addFormat(BOOLEAN_FORMAT, customBoolean);
ajv.addFormat(THREE_DIGIT_NUMBER_FORMAT, {
  type: 'number',
  validate: customThreeDigitNumber,
});
ajv.addFormat(NO_GMAIL_FORMAT, customNoGmailDomain);
ajv.addFormat(PHONE_NUMBER_FORMAT, validInternationalPhoneNumber);

export const config = {
  api: {
    bodyParser: false,
  },
};
const papaOptions = {
  worker: true,
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
};
const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, papaOptions);

const dbURL = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;

async function processUpload(req) {
  return new Promise(async (resolve) => {
    const busboy = Busboy({
      headers: req.headers,
      limits: {
        files: 1,
      },
    });

    const collectionName = nameByRace('elf', { gender: 'female' });
    const client = await clientPromise;
    const dbConfig = { dbURL, collectionName, dbName, client };
    const dbClient = new StreamToMongoDB(dbConfig);
    const db = client.db(process.env.DATABASE_NAME | 'yobulk');

    db.collection('templates').findOne(
      { _id: ObjectId(req.headers.template_id) },
      function (err, results) {
        if (err) throw err;
        else {
          busboy.on(
            'file',
            async function (fieldname, file, filename, encoding, mimetype) {
              console.log('The file details are', filename, encoding, mimetype);

              pipeline(
                file,
                parseStream,
                headers_changes,
                datatype_validate,
                dbClient.stream,
                (err) => {
                  if (err) {
                    console.log('Pipeline failed with an error:', err);
                  } else {
                    console.log('Pipeline ended successfully');
                  }
                }
              );

              file.on('end', function () {
                db.collection('templates')
                  .updateOne(
                    { _id: ObjectId(req.headers.template_id) },
                    { $set: { collection_name: collectionName } },
                    { upsert: true }
                  )
                  .then((result, err) => {
                    console.log('---- collection name updateded ----');
                  })
                  .catch((err) => console.log(err));
              });
            }
          );
        }
        busboy.on('close', function () {
          console.log('---- Done parsing form! ----');
          resolve(collectionName);
        });

        var headers_changes = new Transform({
          readableObjectMode: true,
          writableObjectMode: true,
        });

        headers_changes._transform = async function (data, enc, cb) {
          var newdata = await transformer(data, results.columns);
          headers_changes.push(newdata);
          cb();
        };

        var datatype_validate = new Transform({
          readableObjectMode: true,
          writableObjectMode: true,
        });

        datatype_validate._transform = function (data, enc, cb) {
          var newdata = dataValidate(data, results.schema);
          datatype_validate.push(newdata);
          cb();
        };

        req.pipe(busboy);
      }
    );
  });
}
async function transformer(data, transformArrSchema) {
  let transformedData = { ...data };
  let importingColumns = [];
  transformArrSchema.map((eachTransform) => {
    importingColumns.push(eachTransform.label);
    if (eachTransform.label != eachTransform.key) {
      transformedData[eachTransform.label] = transformedData[eachTransform.key];
      delete transformedData[eachTransform.key];
    }
    if (eachTransform.data_type.toUpperCase() === BOOLEAN_DATA_TYPE) {
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
    }
  });

  let returnObj = {};
  importingColumns.forEach((el) => {
    returnObj[el] = transformedData[el];
  });
  return returnObj;
}

const dataValidate = (data, colSchema) => {
  const result = ajv.validate(colSchema, data);
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

export default async function csvUploadHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const returnValue = await processUpload(req);
  res.status(200).end(JSON.stringify({ collection_name: returnValue }));
}
