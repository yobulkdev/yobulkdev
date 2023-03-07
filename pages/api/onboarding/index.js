import getUserInfo from '../../../lib/auth';
import clientPromise from '../../../lib/mongodb';

export default async function fetchTemplateRecords(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  const userData = await getUserInfo(req, res);

  switch (req.method) {
    case 'GET':
      try {
        let user = await db
          .collection('users')
          .findOne({ email: userData.email });
        if (user && user.onboarded) {
          res.status(200).json({ onboarded: true });
        } else {
          res.status(200).json({ onboarded: false });
        }
      } catch (err) {
        console.error(err.message);
        res.status(200).json({ onboarded: false });
      }
      break;
    case 'POST':
      try {
        let { company, role, reason } = req.body;
        let user = await db
          .collection('users')
          .updateOne(
            { email: userData.email },
            { $set: { company: company, role: role, reason: reason, onboarded: true } }
          );
        res.status(200).json({ success: true });
      } catch (err) {
        console.error(err.message);
        res.status(200).json({ success: false });
      }
      break;
  }
}
