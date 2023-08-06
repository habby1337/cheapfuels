import { connectToDatabase } from './lib/mongodb.js';

export default async function handler(req, res) {
  const { database } = await connectToDatabase();
  const collection = database.collection(process.env.ATLAS_COLLECTION);

  const results = await collection
    .find({})
    .project({
      _id: false,
    })
    .toArray();

  res.status(200).json(results);
}
