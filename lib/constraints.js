const createUniqueKey = async (db, collection, keyName) => {
    await db.collection(collection).createIndex({ [keyName]: 1 }, { unique: true });
}
export const createConstraints = async (clientPromise) => {
    console.log('creating constraints');
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME | 'yobulk');
    createUniqueKey(db, 'templates', 'template_name');
    createUniqueKey(db, 'importers', 'name');
    return true;
}