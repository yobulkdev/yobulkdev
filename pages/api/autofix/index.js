import clientPromise from '../../../lib/mongodb';
var mongo = require('mongodb');

export default async function updateRecord(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  const { collection_name, page, limit } = req.query;
  switch (req.method) {
    case 'POST':
      var data = req.body;
      if (Array.isArray(data)) {
        let ops = []
        data.forEach((e) => {
          let item = e.data
          var row_id = new mongo.ObjectId(item._id);
          delete item._id
          ops.push({
            "updateOne": {
              "filter": { "_id": row_id },
              "update": {
                "$set": item
              },
              "upsert": false
            }
          });
        })
        await db
        .collection(data[0]?.collection_id)
        .bulkWrite(ops)
        .then((result, err) => {
          res.send(result);
        });
      } else{
        res.send('no update')
      }
  }
}
