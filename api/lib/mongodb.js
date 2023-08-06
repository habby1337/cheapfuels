import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.ATLAS_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let mongoClient = null;
let database = null;

if (!process.env.ATLAS_URI)
  throw new Error('Please add your mongo uri to .env.local');

export async function connectToDatabase() {
  try {
    if (mongoClient && database) return { mongoClient, database };

    if (process.env.NODE_ENV === 'development') {
      if (!global._mongoClient) {
        mongoClient = await new MongoClient(uri, options).connect();
        global._mongoClient = mongoClient;
      } else {
        mongoClient = global._mongoClient;
      }
    } else {
      mongoClient = await new MongoClient(uri, options).connect();
    }
    database = await mongoClient.db(process.env.ATLAS_DATABASE);
    return { mongoClient, database };
  } catch (e) {
    console.log(e);
  }
}
