import clientPromise from '../../../lib/mongodb';

export default async function recordsCount(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');

  switch (req.method) {
    case 'GET':
      try {
        const recordsCount = await db
          .collection(req.query.collection_name)
          .count();
        res.json({
          totalRecords: recordsCount,
        });
      } catch (err) {
        console.error(err.message);
      }
      break;
  }
}
