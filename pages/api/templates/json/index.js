import clientPromise from '../../../../lib/mongodb';
import { schemaToColumn } from '../../../../lib/validation_util/schemaColumn';
import { schemaGenerator } from '../../../../lib/validation_util/yovalidator';
import getUserInfo from '../../../../lib/auth';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  const userData = await getUserInfo(req, res)

  switch (req.method) {
    case 'GET':
      //some code...
      res.status(200).json({});
      break;

    case 'POST':
      try {
        let { schema, templateName } = req.body;
        if (!schema || !templateName || templateName.length === 0) {
          res.status(400).json({ error: 'Bad Request' });
          break;
        }
        let template = schemaGenerator({ clonedSchema: JSON.parse(schema) });
        template['template_name'] = templateName;
        template['columns'] = schemaToColumn({ schema: JSON.parse(schema) });
        template.user = [userData.email]
        let result = await db.collection('templates').insertOne(template);
        res.status(201).json(result);
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
