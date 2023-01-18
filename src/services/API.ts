import axios from "axios";

const get = (url: string, params = {}) => {
  return axios.get(url, { params });
};

const post = (url: string, params: any) => {
  return axios.post(url, params);
};

const put = (url: string, params: any) => {
  return axios.put(url, params);
};

export { get, post, put };
