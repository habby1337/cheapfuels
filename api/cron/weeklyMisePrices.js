import axios from 'axios';
import * as cheerio from 'cheerio';
import { selectors } from './cssSelectors.js';
import { connectToDatabase } from '../../lib/mongodb.js';

const getUserAgentHeader = () => {
  return {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
  };
};

const fetchData = async (url) => {
  try {
    const response = await axios.get(url, { headers: getUserAgentHeader() });

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
};

const parseFuelData = ($, fuelType) => {
  const fuelData = {
    avg: $(selectors[fuelType].avg).text(),
    accisa: $(selectors[fuelType].accisa).text(),
    iva: $(selectors[fuelType].iva).text(),
    netto: $(selectors[fuelType].netto).text(),
    variation_amount: $(selectors[fuelType].variation_amount).text(),
    variation_percentage: $(selectors[fuelType].variation_percentage_path).attr(
      selectors[fuelType].variation_percentage_attr
    ),
  };

  return fuelData;
};

export default async function handler(req, res) {
  const url = 'https://dgsaie.mise.gov.it/prezzi-settimanali-carburanti';

  if (await alreadyFetchedThisWeek(url)) {
    res.status(208).json({ status: 'Already fetched this week' });
  } else {
    try {
      const htmlData = await fetchData(url);
      const $ = cheerio.load(htmlData);

      const avgPricePerFuelType = {
        petrol: parseFuelData($, 'petrol'),
        diesel: parseFuelData($, 'diesel'),
        gpl: parseFuelData($, 'gpl'),
      };

      const response = await saveToMongoDB(avgPricePerFuelType);

      if (response.error) res.status(500).json({ error: response.message });

      res.status(200).json({ status: response.message, avgPricePerFuelType });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const saveToMongoDB = async (avgPricePerFuelType) => {
  const { database } = await connectToDatabase();
  const collection = database.collection(process.env.ATLAS_COLLECTION);

  const result = await collection.insertOne({
    date: new Date(),
    ...avgPricePerFuelType,
  });

  if (result.insertedCount === 0) {
    return { error: true, message: 'No documents were inserted' };
  }

  return {
    error: false,
    message: `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
  };
};

const alreadyFetchedThisWeek = async (url) => {
  const { database } = await connectToDatabase();
  const collection = database.collection(process.env.ATLAS_COLLECTION);

  const result = await collection
    .find({
      date: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 6)),
      },
    })
    .toArray();

  return result.length > 0;
};
