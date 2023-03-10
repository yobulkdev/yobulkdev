import getGPTResponse from '../../../lib/gpt-engine';
import clientPromise from '../../../lib/mongodb';


export default async function feedback(req, res) {
  const queryParams = req.query;
  const { columnName, columnValue, collection } = queryParams;
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  switch (req.method) {
    case 'GET':
      const rows = await db
        .collection(collection)
        .find()
        .skip(parseInt(0))
        .limit(parseInt(10))
        .toArray();
      let parsedRows = rows.map((elem) => {
        let x = elem;
        delete x['validationData'];
        return x;
      });
      let actualPrompt = `You are a potential error finder on the following data. I am passing an array of object as input. For each object in this array, validate if the value sematically and logically matches for it or not. For example if age is 500. It is not a logical value. For output return the original array but add a feedback object in each array where you can add keys of that object and their feedback. The response should be an array only so i can parse it. \n
      Input Array: ${JSON.stringify(parsedRows, 2, 0)}`;
      let originalResp = await getGPTResponse(actualPrompt, 1000, 0, 0);
      let resp = originalResp;
      try {
        resp = originalResp.split('Output Array: ');
        resp = JSON.parse(resp[1]);
      } catch (e) {
        console.log(e);
        resp = originalResp;
      }
      let rv = {};
      for (const item of resp) {
        rv[item._id] = item;
      }
      res.json({ status: 200, data: rv });
      break;

    case 'POST':
      console.log(req.body);
      let csvPrompt = `you are a potential data error finder. Find semantic data errors in below json data. Send all the feedback for each key value pair as json object. \n
        ${JSON.stringify(req.body)}
      `;
      console.log(csvPrompt);
      let csvresp = await getGPTResponse(csvPrompt, 100, 0, 0);
      console.log('Feedback', csvresp);
      res.json({ status: 200, data: csvresp });
      break;

    default:
      res.json({ status: 405, data: 'Method not found' });
      break;
  }
}
