import getGPTResponse from "../../../lib/gpt-engine";
import clientPromise from '../../../lib/mongodb';
import getUserDataUsage from '../../../lib/usageLimit';

export default async function generateRegex(req, res) {
  const userData = await getUserInfo(req, res);
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');

  switch (req.method) {
    case 'POST':
      const usage = await getUserDataUsage(userData.email);
      if(usage.openApiHits > process.env.OPEN_API_LIMIT){
        return res.json({status: 400, data: 'You have exhausted your open api limit.'})
      } else{
        await db.collection('users').updateOne({email: userData.email}, {$inc: {openApiHits: 1}})
      }
      
      let prompt = req.body.prompt;
      let actualPrompt = 'Generate a regex for this description: ' + prompt;
      let resp = await getGPTResponse(actualPrompt, 50)
      res.json({ status: 200, data: resp });
      break;
    default:
      res.json({ status: 405, data: 'Method not found' });
  }
}