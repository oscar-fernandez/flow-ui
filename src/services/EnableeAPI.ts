import IEnablee from "../models/interfaces/IEnablee";
import { get, post, put } from "./API";

const baseUrl = process.env.VITE_ENABLEMENT_FEMS;

function GetPaginatedEnablees(pageNumber: number) {
  return get(baseUrl + "/enablee", { pageNumber: `${pageNumber}` });
}

function GetEnableesWithNoStartDate() {
  return get(baseUrl + "/enablee/pendingStart");
}

function GetEnableesPendingPodAssignment() {
  return get(baseUrl + "/enablee/pendingPodAssignment");
}

function CreateEnablee(enablee: IEnablee) {
  return post(baseUrl + "/enablee", enablee);
}

function UpdateEnablee(enablee: IEnablee) {
  return put(baseUrl + "/enablee", enablee);
}

export {
  GetPaginatedEnablees,
  GetEnableesWithNoStartDate,
  GetEnableesPendingPodAssignment,
  CreateEnablee,
  UpdateEnablee,
};
