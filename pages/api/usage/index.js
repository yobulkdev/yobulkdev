import getUserInfo from '../../../lib/auth';
import getUserDataUsage from '../../../lib/usageLimit';
import clientPromise from '../../../lib/mongodb';

export default async function getUsage(req, res) {
  const userData = await getUserInfo(req, res)

  switch (req.method) {
    case 'GET':
      try {
        const usage = await getUserDataUsage(userData.email);
        res.status(200).json({usage: usage});
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'failed to load data' });
      }
      break;
    case 'PUT':
      try {
        const {fileSize} = req.body;
        const fileSizeKbs = isNaN(Math.round(Number(fileSize)/1024)) ? 0 : Math.round(fileSize/1024);
        const client = await clientPromise;
        const db = client.db(process.env.DATABASE_NAME | 'yobulk');
        const usage = await getUserDataUsage(userData.email);
        if(usage.memoryUsage + fileSizeKbs > process.env.MEMORY_LIMIT){
          return res.status(400).json({error: 'Memory limit exceeded'})
        }
        console.log(fileSizeKbs)
        await db.collection('users').updateOne({email: userData.email}, {$inc: {memoryUsage : fileSizeKbs}})
        return res.status(200).json({success: true})
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'failed to load data' });
      }
      break;
    default:
        res.status(405).json({error: 'Method not allowed'})
        break;
  }
}
