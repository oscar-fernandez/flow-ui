import { get } from "./API";

const baseUrl = `${process.env.VITE_ENABLEMENT_FEMS}/pod`;

export const getPendingPods = () => {
  return get(`${baseUrl}/pending`);
};

export const getCompletedPods = () => {
  return get(`${baseUrl}/completed`);
};
