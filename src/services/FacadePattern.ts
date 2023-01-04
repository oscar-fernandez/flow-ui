import axios from "axios";

const getEnablees = async (url: string, params = {}) => {
  const queryString = Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join("&");
  return await axios.get(`${url}?${queryString}`);
};

export { getEnablees };
