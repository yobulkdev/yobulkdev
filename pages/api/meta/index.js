import clientPromise from '../../../lib/mongodb';

export default async function fetchPaginatedRecords(req, res) {
  const queryParams = req.query;
  const { collection, _start, _end, column_name } = queryParams;
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  switch (req.method) {
    case 'POST':
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection('posts').insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case 'GET':
      let query = {};
      if (column_name != undefined && column_name != 'showAllErrors')
        query = { 'validationData.key': column_name };
      const paginatedRows = await db
        .collection(collection)
        .find(query)
        .skip(parseInt(_start))
        .limit(parseInt(_end))
        .toArray();
      res.json({ status: 200, data: paginatedRows });
      break;
  }
}
