import { get } from "./API";

const baseUrl: string = import.meta.env.VITE_ENABLEMENT_FEMS || "";

function GetPaginatedEnablees(pageNumber: number) {
  return get(baseUrl + "/enablee", { pageNumber: `${pageNumber}` });
}

function GetEnableesWithNoStartDate() {
  return get(baseUrl + "/enablee/pendingStart");
}

function GetEnableesPendingPodAssignment() {
  return get(baseUrl + "/enablee/pendingPodAssignment");
}

export {
  GetPaginatedEnablees,
  GetEnableesWithNoStartDate,
  GetEnableesPendingPodAssignment,
};
