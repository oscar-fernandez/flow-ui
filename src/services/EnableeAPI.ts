import axios from "axios";

const baseUrl: string = import.meta.env.VITE_ENABLEMENT_FEMS || "";

async function GetPaginatedEnablees(pageNumber: number) {
  try {
    const resp = await axios.get(`${baseUrl}/enablee`, {
      params: { pageNumber: `${pageNumber}` },
    });

    return resp;
  } catch (error) {
    console.error("<GetPaginatedEnablees>: There was an error! " + error);
    throw error;
  }
}

async function GetEnableesWithNoStartDate() {
  try {
    const resp = await axios.get(`${baseUrl}/enablee/pendingStart`);

    return resp;
  } catch (error) {
    console.error("<GetEnableesWithNoStartDate>: There was an error! " + error);
    throw error;
  }
}

async function GetEnableesPendingPodAssignment() {
  try {
    const res = await axios.get(`${baseUrl}/enablee/pendingPodAssignment`);

    return res.data;
  } catch (error) {
    console.error(
      "<GetEnableesPendingPodAssignment>: There was an error! " + error
    );
    throw error;
  }
}

export {
  GetPaginatedEnablees,
  GetEnableesWithNoStartDate,
  GetEnableesPendingPodAssignment,
};
