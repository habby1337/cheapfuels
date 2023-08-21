import axios from "axios";

export const getBrandList = async () => {
  axios
    .get("/api/brandList")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
