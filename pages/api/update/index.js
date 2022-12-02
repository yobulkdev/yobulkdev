import clientPromise from '../../../lib/mongodb';

const assert = require('assert');
var mongo = require('mongodb');

export default async function updateRecord(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  const { collection_name, page, limit } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        var query = {};
        if (req.query.valid == 'true') {
          query = { $where: 'this.validationData.length == 0' };
        } else if (req.query.valid == 'false')
          query = { $where: 'this.validationData.length > 0' };
        console.log(query);
        // execute query with page and limit values
        const data = await db
          .collection(collection_name)
          .find(query)
          //.project({ validationData: 1 })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .toArray();
        // console.log('---- data ----', data.length);

        // get total documents in the Posts collection
        const count = await db.collection(collection_name).count();
        // console.log('---- count ----', count);

        // return response with posts, total pages, and current page
        res.json({
          data,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'failed to load data' });
      }
      break;

    case 'POST':
      var data = req.body.data;
      var row_id = new mongo.ObjectId(data._id);
      delete data._id;
      db.collection(req.body.collection_id)
        .updateOne({ _id: row_id }, { $set: data }, { upsert: false })
        .then((result, err) => {
          res.send(result);
        });
      break;
  }
}
