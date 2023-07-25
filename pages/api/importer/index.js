import clientPromise from '../../../lib/mongodb';
let ObjectId = require('mongodb').ObjectId;
import getUserInfo from '../../../lib/auth';

export default async function importer(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  const userData = await getUserInfo(req, res)

  switch (req.method) {
    case 'POST':
      try {
        let { importerName, templateId, organizationId, workspaceId, templateName } =
          req.body;
        let newImporter = {
          name: importerName,
          templateId: templateId,
          organizationId: organizationId,
          workspaceId: workspaceId,
          templateName: templateName,
          date: new Date(),
          user: [userData.email]
        };
        let result = await db.collection('importers').insertOne(newImporter);
        res.status(201).send(result);
      } catch (err) {
        console.error(err.message);
        if (err.code === 11000) {
          res.status(400).json({ error: 'Importer with this name already exists !' });
          break;
        }
        res.status(500).json({ error: 'failed to load data' });
      }
      break;
    case 'GET':
      try {
        let result = await db.collection('importers').find({ $or: 
          [{user: 'all'}, {user: userData.email}]
        }).toArray();
        res.status(200).send(result);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'failed to load data' });
      }
      break;
    default:
      res.status(405).json({ error: 'method not allowed' });
      break;
  }
}
