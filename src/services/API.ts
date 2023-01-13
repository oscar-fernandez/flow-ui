import axios from "axios";

const get = async (url: string, params = {}) => {
  return await axios.get(url, { params });
};

const post = async (url: string, params = {}) => {
  return await axios.post(url, params);
};

const put = async (url: string, params = {}) => {
  return await axios.post(url, params);
};

export { get, post, put };
