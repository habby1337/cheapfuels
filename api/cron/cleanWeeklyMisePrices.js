import { connectToDatabase } from '../../lib/mongodb.js';

export default async function handler(req, res) {
  //connect and remove older than 7 days
  const { database } = await connectToDatabase();
  const collection = database.collection(process.env.ATLAS_COLLECTION);
  const results = await collection.deleteMany({
    date: {
      $lt: new Date(new Date().setDate(new Date().getDate() - 7)),
    },
  });

  res.status(200).json(results);
}
