import axios from "axios";

const get = async (url: string, params = {}) => {
  const queryString = Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join("&");
  return await axios.get(`${url}?${queryString}`);
};

const post = async (url: string, params = {}) => {
  const queryString = Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join("&");
  return await axios.post(`${url}?${queryString}`);
};

const put = async (url: string, params = {}) => {
  const queryString = Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join("&");
  return await axios.put(`${url}?${queryString}`);
};

export { get, post, put };
