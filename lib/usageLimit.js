import clientPromise from './mongodb';

const getUserDataUsage = async (email) => {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE_NAME | 'yobulk');
  const userCollections = await db
    .collection('templates')
    .find({$and: [{ template_name: { $exists: false }}, {user: email}]})
    .toArray();
  let totalSizeBytes = 0;
  for (const collection of userCollections){
    const size = await db.collection(collection.collection_name).stats()
    totalSizeBytes += Number(size.size)
  }
  const totalSizeKbs = totalSizeBytes/1024;
  return Math.round(totalSizeKbs);
};

export default getUserDataUsage;
