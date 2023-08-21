import axios from "axios";

export default async function getAvgPrices() {
  return axios.get(`/api/fuelPriceData`);
}
