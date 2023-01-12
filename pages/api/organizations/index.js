import clientPromise from '../../../lib/mongodb';

export default async function recordsCount(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');

  switch (req.method) {
    case 'GET':
      try {
        let result = await db.collection('organizations').find({}).toArray();
        res.status(201).send(result)
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
