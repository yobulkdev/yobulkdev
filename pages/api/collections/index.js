import clientPromise from '../../../lib/mongodb';

export default async function fetchCollections(req, res) {
  const queryParams = req.query;
  const { useremail } = queryParams;
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  switch (req.method) {
    case 'GET':
      let query = {};
      query = { user_email: useremail };
      const paginatedRows = await db
        .collection(collection)
        .find(query)

        .toArray();
      res.json({ status: 200, data: paginatedRows });
      break;

    default:
      res.json({ status: 200, data: 'No method defined!' });
  }
}
