import axios from "axios";

const baseUrl: string = import.meta.env.VITE_ENABLEMENT_FEMS || "";

function GetPaginatedEnablees(pageNumber: number) {
  return axios.get(`${baseUrl}/enablee`, {
    params: { pageNumber: `${pageNumber}` },
  });
}

function GetEnableesWithNoStartDate() {
  return axios.get(`${baseUrl}/enablee/pendingStart`);
}

function GetEnableesPendingPodAssignment() {
  return axios.get(`${baseUrl}/enablee/pendingPodAssignment`);
}

export {
  GetPaginatedEnablees,
  GetEnableesWithNoStartDate,
  GetEnableesPendingPodAssignment,
};
