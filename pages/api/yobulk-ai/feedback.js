import getGPTResponse from '../../../lib/gpt-engine';

export default async function feedback(req, res) {
  const queryParams = req.query;
  const { columnName, columnValue } = queryParams;
  switch (req.method) {
    case 'GET':
      let actualPrompt = `You are a potential error finder on the following data. Find if the value symantically matches with the column name.
      Column Name: ${columnName}
      value: ${columnValue}
      Return the feedback as a json object`;
      let resp = await getGPTResponse(actualPrompt, 100, 0, 0);
      console.log(resp);
      res.json({ status: 200, data: resp });
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
