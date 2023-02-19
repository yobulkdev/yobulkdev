import clientPromise from '../../../lib/mongodb';
let ObjectId = require('mongodb').ObjectId;

export default async function importer(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');

  switch (req.method) {
    case 'GET':
      try {
        let { importerId } = req.query;
        let result = await db
          .collection('importers')
          .findOne({ _id: ObjectId(importerId) });
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
