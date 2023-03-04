import clientPromise from '../../../lib/mongodb';
let ObjectId = require('mongodb').ObjectId;
import getUserInfo from '../../../lib/auth';
import getUserDataUsage from '../../../lib/usageLimit';

export default async function getUsage(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  const userData = await getUserInfo(req)

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
    default:
        res.status(405).json({error: 'Method not allowed'})
        break;
  }
}
