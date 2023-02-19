import clientPromise from '../../../lib/mongodb';
let ObjectId = require('mongodb').ObjectId;

export default async function organization(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');

  switch (req.method) {
    case 'POST':
      try {
        let {orgName, workspaceName, collaborators } = req.body;
        let newOrg = {
            orgName : orgName,
            workspaces:[
                {
                    workspaceId: new ObjectId(),
                    workspaceName: workspaceName,
                    collaborators: collaborators
                }
            ]
        }
        let result = await db.collection('organizations').insertOne(newOrg);
        res.status(201).send(result)
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'failed to load data' });
      }
      break;
    default:
        res.status(405).json({ error: 'method not allowed' });
        break;
  }
}
