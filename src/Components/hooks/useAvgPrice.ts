import { useEffect, useState } from "react";

import { AvgPrice } from "../../Shared/Interfaces/interfaces";
export const useAvgPrice = () => {
  const [avgPrice, setAvgPrice] = useState<AvgPrice | {}>({});
  const [error, setError] = useState<null | string>(null);

  const fetchAvgPrice = async () => {
    //check if already fetched data and return
    if (Object.keys(avgPrice).length !== 0)
      return { avgPrice, error, fetchAvgPrice };

    try {
      const response = await fetch("/api/fuelPriceData");
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
