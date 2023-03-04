import clientPromise from '../../../lib/mongodb';
let ObjectId = require('mongodb').ObjectId;
import getUserInfo from '../../../lib/auth';

export default async function importer(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  const userData = await getUserInfo(req)

  switch (req.method) {
    case 'GET':
      try {
        let { importerId } = req.query;
        let result = await db
          .collection('importers')
          .findOne({$and: [{$or:[{user: 'all'}, {user: userData.email}]}, { _id: ObjectId(importerId) }]});
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
