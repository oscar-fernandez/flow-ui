import axios from "axios";

const getEnablees = async (url: string, params = {}) => {
  const queryString = Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join("&");
  return await axios.get(`${url}?${queryString}`);
};

const mgtGet = async (url: string) => {
  return await axios.get(`${url}`);
};

const mgtPost = async (url: string, params = {}) => {
  const queryString = Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join("&");
  return await axios.post(`${url}?${queryString}`);
};

const mgtPut = async (url: string, params = {}) => {
  const queryString = Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join("&");
  return await axios.put(`${url}?${queryString}`);
};

export { getEnablees, mgtGet, mgtPost, mgtPut };
