import getGPTResponse from "../../../lib/gpt-engine";
import getUserInfo from '../../../lib/auth';
import clientPromise from '../../../lib/mongodb';
import getUserDataUsage from '../../../lib/usageLimit';

export default async function ajvSchemaGenerator(req, res) {
  const userData = await getUserInfo(req, res);
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');

  switch (req.method) {
    case 'POST':
      let prompt = req.body.prompt;
      let actualPrompt = `You are a AJV schema generator.
      Generate an AJV schema for the description: ${prompt}
      Return the value as a json object`;
      const usage = await getUserDataUsage(userData.email);
      if(usage.openApiHits > process.env.OPEN_API_LIMIT){
        return res.json({status: 400, data: 'You have exhausted your yobulk ai api limit.'})
      } else{
        console.log(userData.email)
        await db.collection('users').updateOne({email: userData.email}, {$inc: {openApiHits: 1}})
      }
      let resp = await getGPTResponse(actualPrompt, 200, 0, 0);
      res.json({ status: 200, data: resp });
      break;
    default:
      res.json({ status: 405, data: 'Method not found' });
  }
}