import getUserInfo from '../../../lib/auth';
import clientPromise from '../../../lib/mongodb';
import generateSchema from '../../../lib/template-engine';
let ObjectId = require('mongodb').ObjectId;

export default async function fetchTemplateRecords(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  const userData = await getUserInfo(req, res)
  switch (req.method) {
    case 'GET':
      let query = {};
      if (req.headers.template_id) {
        query = { $and: [{$or:[{user: 'all'}, {user: userData.email}]}, { _id: ObjectId(req.headers.template_id) }]}
        try {
          let result = await db.collection('templates').findOne(query);
          res.send(result);
        } catch (err) {
          console.error(err.message);
        }
      } else {
        try {
          let result = await db.collection('templates').find({ $or: 
            [{user: 'all'}, {user: userData.email}]
          }).toArray();
          res.send(result);
        } catch (err) {
          console.error(err.message);
          res.status(500).json({ error: 'failed to load data' });
        }
      }
      break;
    case 'POST':
      try {
        let templateBody = req.body;
        if (templateBody.baseTemplateId) {
          let baseTemplate = await db
            .collection('templates')
            .findOne({ _id: ObjectId(templateBody.baseTemplateId) });
          let columnLabels = templateBody.columns.map((el) => el.label);
          let baseTemplateSchema = baseTemplate.schema;
          let requiredCols = baseTemplateSchema.required?.filter((el) =>
            columnLabels.includes(el)
          );
          baseTemplateSchema.required = requiredCols;
          templateBody.schema = baseTemplateSchema;
          templateBody.validators = baseTemplate.validators;
        } else {
          let generatedSchema = generateSchema(templateBody.columns);
          templateBody.schema = generatedSchema;
        }
        templateBody.created_date = new Date();
        templateBody.user = [userData.email]
        console.log(templateBody)
        let result = await db.collection('templates').insertOne(templateBody);
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed to create data' });
      }
      break;
    case 'PUT':
      try {
        let columnsData = req.body.columns;
        let data = req.body;
        let generatedSchemaUpdate = generateSchema(columnsData);
        data.schema = generatedSchemaUpdate;
        let result = await db
          .collection('templates')
          .updateOne(
            { $and: [{user: userData.email},{ _id: ObjectId(req.query.template_id) }]},
            { $set: data },
            { upsert: false }
          );
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed to put data' });
      }
      break;
    case 'DELETE':
      try {
        let result = await db
          .collection('templates')
          
          .deleteOne({ $and: [{user: userData.email},{ _id: ObjectId(req.query.template_id) }]});
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed to delete data' });
      }
      break;
  }
}
