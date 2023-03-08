import getGPTResponse from "../../../lib/gpt-engine";
import clientPromise from '../../../lib/mongodb';
import getUserDataUsage from '../../../lib/usageLimit';

export default async function matchColumns(req, res) {
  const userData = await getUserInfo(req, res);
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');

  switch (req.method) {
    case 'POST':
      const usage = await getUserDataUsage(userData.email);
      if(usage.openApiHits > process.env.OPEN_API_LIMIT){
        return res.json({status: 400, data: 'You have exhausted your yobulk ai api limit.'})
      } else{
        await db.collection('users').updateOne({email: userData.email}, {$inc: {openApiHits: 1}})
      }
      
      let validationTemplateColumns = req.body.validationTemplateColumns;
      let saasTemplateColumns = req.body.saasTemplateColumns;
      if (!Array.isArray(validationTemplateColumns) || !Array.isArray(saasTemplateColumns)){
        return res.json({status: 400, data: "Please send correct input lists"})
      }
      let actualPrompt = `You are a column matcher. Match two lists with the following values.
      List1: ${validationTemplateColumns}
      List2: ${saasTemplateColumns}
      Return the value as a json object`;
      let resp = await getGPTResponse(actualPrompt, 100, 0, 0);
      let matchedColumns = {} ;
      try {
        matchedColumns = JSON.parse(resp);
      } catch(e){
        for(let i in saasTemplateColumns){
          try{
            matchedColumns[validationTemplateColumns[i]] = saasTemplateColumns[i]
          } catch(e){}
        }
      }
      res.json({ status: 200, data: matchedColumns });
      break;
    default:
      res.json({ status: 405, data: 'Method not found' });
  }
}