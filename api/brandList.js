import { FuelsApiClient } from 'osservaprezzi-carburanti-node';
import customAxios from '../lib/customAxios.js';
export default async function handler(req, res) {
  try {
    const miseBackend = new FuelsApiClient(
      'http://5.189.131.174:8443/https://carburanti.mise.gov.it/ospzApi/',
      customAxios
    );

    miseBackend.registry
      .brandsLogosList()
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

// logo => Logo
// th0 => Badge Nero
// th1 => Badge Verde
// th2 => Badge Verde
// th3 => Badge Giallo
// th4 => Badge Arancione
// th5 => Badge Rosso
