import clientPromise from '../../../lib/mongodb';
let ObjectId = require('mongodb').ObjectId;

export default async function fetchTemplateRecords(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  switch (req.method) {
    case 'GET':
      try {
        let results = await db
          .collection('templates')
          .find({ template_name: { $exists: false } })
          .toArray();
        let i = 1;
        for (const item of results) {
          const recordsCount = await db
            .collection(item.collection_name)
            .countDocuments({});
          const validData = await db
            .collection(item.collection_name)
            .find({ 'validationData.0': { $exists: false } })
            .count();
          item.rows = validData;
          item.status = (recordsCount === validData) ? 'Complete' : 'Incomplete'; 
          item.orgId = i;
          i+=1;
        }
        res.send(results);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'failed to load data' });
      }
      break;
  }
}
