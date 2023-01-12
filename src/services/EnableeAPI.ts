import { getEnablees } from "./FacadePattern";

const baseUrl: string = process.env.VITE_ENABLEMENT_FEMS || "";

function GetPaginatedEnablees(pageNumber: number) {
  return getEnablees(`${baseUrl}/enablee`, { pageNumber: `${pageNumber}` });
}

function GetEnableesWithNoStartDate() {
  return getEnablees(`${baseUrl}/enablee/pendingStart`);
}

function GetEnableesPendingPodAssignment() {
  return getEnablees(`${baseUrl}/enablee/pendingPodAssignment`);
}

export {
  GetPaginatedEnablees,
  GetEnableesWithNoStartDate,
  GetEnableesPendingPodAssignment,
};
