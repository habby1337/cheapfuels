import { connectToDatabase } from '../lib/mongodb.js';

export default async function handler(req, res) {
  const { database } = await connectToDatabase();
  const collection = database.collection(process.env.ATLAS_COLLECTION);

  //get latest document
  const results = await collection
    .find({})
    .project({
      _id: 0,
    })
    .sort({ date: -1 })
    .limit(1)
    .next();

  res.status(200).json(results);
}
