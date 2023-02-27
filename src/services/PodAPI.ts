import { get, post, put } from "./API";
import IFEPod from "../models/interfaces/IFEPod";

const baseUrl = `${process.env.VITE_ENABLEMENT_FEMS}/pod`;

export const getPendingPods = () => {
  return get(`${baseUrl}/pending`);
};

export const getCompletedPods = () => {
  return get(`${baseUrl}/completed`);
};

export const getPods = (pageNumber: number) => {
  return get(`${baseUrl}?page=${pageNumber}`);
};

export const getActivePods = () => {
  return get(`${baseUrl}/active`);
};

export const getAvailablePods = () => {
  return get(`${baseUrl}/available`);
};

export const createPod = (pod: IFEPod) => {
  return post(`${baseUrl}`, pod);
};

export const updatePod = (pod: IFEPod) => {
  return put(`${baseUrl}`, pod);
};

export const getPodById = (podId: number) => {
  return get(`${baseUrl}/id?podId=${podId}`);
};
