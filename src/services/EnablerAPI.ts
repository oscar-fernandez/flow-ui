import { get } from "./API";

const baseUrl = `${process.env.VITE_ENABLEMENT_FEMS}/enabler`;

export const getAllEnablers = () => {
  return get(baseUrl);
};
