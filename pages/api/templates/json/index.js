import clientPromise from '../../../../lib/mongodb';
import { schemaGenerator } from '../../../../lib/validation_util/yovalidator';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  switch (req.method) {
    case 'GET':
      //some code...
      res.status(200).json({});
      break;

    case 'POST':
      try {
        let codeBody = req.body.data;
        let template = schemaGenerator({ clonedSchema: JSON.parse(codeBody) });
        let result = await db.collection('templates').insertOne(template);
        res.status(201).json({});
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed to create data' });
      }

      break;

    case 'PATCH':
      //some code...
      res.status(200).json({});
      break;

    default:
      res.status(405).end(`${method} Not Allowed`);
      break;
  }
}

/**
 * 1. User submits json with format and validate function for a column
 * 2. A function will create schema json out of that json data
 * 3. when a request comes that schema json will be used in validation
 */
