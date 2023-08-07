import { FuelsApiClient } from 'osservaprezzi-carburanti-node';

import axios from 'axios';
export default async function handler(req, res) {
  try {
    const customHeaders = {
      'Access-Control-Allow-Origin': '*',
      origin: 'mad9rev3pgf4qwz-FNQ',
    };

    const customAxios = axios.create({
      headers: customHeaders,
    });
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
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
}
