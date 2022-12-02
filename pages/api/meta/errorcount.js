import clientPromise from '../../../lib/mongodb';

export default async function recordsCount(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');

  switch (req.method) {
    case 'GET':
      try {
        const validData = await db
          .collection(req.query.collection_name)
          .find({ $where: 'this.validationData.length == 0' })
          .count();

        const errorCount = await db
          .collection(req.query.collection_name)
          .aggregate([
            {
              $unwind: '$validationData',
            },
            {
              $group: {
                _id: '$validationData.key',
                count: {
                  $sum: 1,
                },
              },
            },
          ])
          .toArray();
        res.json({
          validRecords: validData,
          errorCountbyColumn: errorCount,
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'failed to load data' });
      }
      break;
  }
}
