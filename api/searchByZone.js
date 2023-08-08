import { FuelsApiClient } from 'osservaprezzi-carburanti-node';
import customAxios from '../lib/customAxios.js';

import axios from 'axios';
export default async function handler(req, res) {
  try {
    const miseBackend = new FuelsApiClient(
      'http://5.189.131.174:8443/https://carburanti.mise.gov.it/ospzApi/',
      customAxios
    );

    if (req.body === undefined)
      res.status(400).json({ error: 'Bad request, missing body' });

    const { points, fuelType, refuelingMode, priceOrder } = req.body;

    const searchCriteria = {
      points: points,
      fuelType: fuelType,
      refuelingMode: refuelingMode,
      priceOrder: priceOrder,
    };

    await miseBackend.search
      .byZone(searchCriteria)
      .then((data) => {
        console.warn('data', data);
        res.status(200).json(data);
      })
      .catch((error) => {
        console.warn('error', error);
        res.status(500).json(error);
      });
  } catch (error) {
    console.warn('error', error);
    res.status(500).json(error);
  }
}
