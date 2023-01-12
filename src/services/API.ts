import axios from "axios";

const get = async (url: string, params = {}) => {
  return await axios.get(url, { params });
};

const post = async (url: string, params = {}) => {
  return await axios.post(url, { params });
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
