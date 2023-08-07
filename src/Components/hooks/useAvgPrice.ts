import { useEffect, useState } from 'react';

type FuelData = {
  avg: string;
  accisa: string;
  iva: string;
  netto: string;
  variation_amount: string;
  variation_percentage: string;
};

interface AvgPrice {
  date: string;
  petrol: FuelData;
  diesel: FuelData;
  gpl: FuelData;
}

export const useAvgPrice = () => {
  const [avgPrice, setAvgPrice] = useState<AvgPrice | {}>({});
  const [error, setError] = useState<null | string>(null);

  const fetchAvgPrice = async () => {
    //check if already fetched data and return
    if (Object.keys(avgPrice).length !== 0)
      return { avgPrice, error, fetchAvgPrice };

    try {
      const response = await fetch('/api/fuelPriceData');
      const data = await response.json();
      setAvgPrice(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAvgPrice();
  }, []);

  return { avgPrice, error, fetchAvgPrice };
};
