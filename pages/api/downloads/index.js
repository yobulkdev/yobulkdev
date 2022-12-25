import clientPromise from '../../../lib/mongodb';
import Papa from 'papaparse';
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};
export default async function downloadFile(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  switch (req.method) {
    case 'GET':
      try {
        let count = 0;
        console.log('---- collection ----', req.headers.collection_name);
        let collection = await db.collection(req.headers.collection_name);
        var stream = await collection
          .find({ 'validationData.0': { $exists: false } })
          .project({ _id: 0, validationData: 0 })
          .stream();
        let headerFlog = true;
        stream.on('data', async function (data) {
          let columnsHeaders = Object.keys(data);

          if (headerFlog) {
            headerFlog = false;
            count++;
            let csvDataFirstRow = await Papa.unparse(new Array(data), {
              header: true,
              columns: columnsHeaders,
              newline: '\r\n',
            });

            res.write(csvDataFirstRow);
          } else {
            var csvData = await Papa.unparse(new Array(data), {
              header: false,
              columns: columnsHeaders,
              newline: '\r\n',
            });
            csvData = '\r\n' + csvData;
            count++;
            res.write(csvData);
          }
        });
        res.setHeader('Content-Type', 'text/csv');
        stream.on('end', function (err) {
          console.log('---- array data ----', count);
          if (err) res.send(err);
          res.end();
        });
      } catch (err) {
        console.error(err.message);
      }
      break;
  }
}
