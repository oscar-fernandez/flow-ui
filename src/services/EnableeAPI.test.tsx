import { describe, it, expect, vi } from "vitest";
import {
  GetPaginatedEnablees,
  GetEnableesWithNoStartDate,
  GetEnableesPendingPodAssignment,
  CreateEnablee,
  UpdateEnablee,
} from "./EnableeAPI";
import axios from "axios";
import IEnablee from "../models/interfaces/IEnablee";

vi.mock("axios");
const mockPost = axios.post as jest.Mock;
const mockPut = axios.put as jest.Mock;

describe("EnableeAPI tests", () => {
  it("GetPaginatedEnablees works properly", async () => {
    const pageOfItem = {
      items: [],
      hasNext: false,
      totalElements: 5,
    };

    const axiosres = {
      data: pageOfItem,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };

    const mockGet = axios.get as jest.Mock;

    mockGet.mockResolvedValueOnce(axiosres);
    const result = await GetPaginatedEnablees(3);

    expect(result.data == pageOfItem && result.status == 200).toBeTruthy();
  });

  it("GetPaginatedEnablees catches an excpetion error", async () => {
    const mockGet = axios.get as jest.Mock;

    mockGet.mockRejectedValueOnce({ error: "some error" });
    await GetPaginatedEnablees(3).catch((err) =>
      expect(err).toEqual({ error: "some error" })
    );
  });

  it("GetEnableesWithNoStartDate works properly", async () => {
    const enableesList = [
      {
        employeeId: 0,
        firstName: "John",
        lastName: "Doe",
        dateOfJoin: new Date(1995, 11, 16),
        enablementStartDate: new Date(1995, 11, 18),
        enablementEndDate: new Date(1995, 12, 16),
        assetTag: "N/A",
        isEmployed: true,
        technology: {
          id: 1,
          name: "React",
        },
        countryCode: 200,
        gradeId: 10,
        communityId: 13,
        employementTypeId: 1,
        podId: 24,
        commentId: [1, 2, 3],
      },
    ];

    const axiosRes = {
      data: enableesList,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };
    const mockGet = axios.get as jest.Mock;

    mockGet.mockResolvedValueOnce(axiosRes);
    const result = await GetEnableesWithNoStartDate();
    expect(result.data == enableesList && result.status == 200).toBeTruthy();
  });

  it("GetEnableesWithNoStartDate catches an excpetion error", async () => {
    const mockGet = axios.get as jest.Mock;
    mockGet.mockRejectedValueOnce({ error: "some error" });
    await GetEnableesWithNoStartDate().catch((err) =>
      expect(err).toEqual({ error: "some error" })
    );
  });

  it("GetEnableesPendingPodAssignment works properly", async () => {
    const enableesList = [
      {
        employeeId: 0,
        firstName: "John",
        lastName: "Doe",
        dateOfJoin: new Date(1995, 11, 16),
        enablementStartDate: new Date(1995, 11, 18),
        enablementEndDate: new Date(1995, 12, 16),
        assetTag: "N/A",
        isEmployed: true,
        technology: {
          id: -1,
          name: "React",
        },
        countryCode: 200,
        gradeId: 10,
        communityId: 13,
        employementTypeId: 1,
        podId: 24,
        commentId: [1, 2, 3],
      },
    ];

    const axiosRes = {
      data: enableesList,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };

    const mockGet = axios.get as jest.Mock;

    mockGet.mockResolvedValueOnce(axiosRes);
    const result = await GetEnableesPendingPodAssignment();

    expect(result.data == enableesList).toBeTruthy();
  });

  it("GetEnableesPendingPodAssignment catches an exception error", async () => {
    const mockGet = axios.get as jest.Mock;

    mockGet.mockRejectedValueOnce({ error: "some error" });
    await GetEnableesPendingPodAssignment().catch((err) =>
      expect(err).toEqual({ error: "some error" })
    );
  });

  it("Should create enablee", async () => {
    const enableesList = [
      {
        employeeId: 10,
        firstName: "John",
        lastName: "Doe",
        dateOfJoin: new Date(1995, 11, 16).toString(),
        enablementStartDate: new Date(1995, 11, 18).toString(),
        enablementEndDate: new Date(1995, 12, 16).toString(),
        assetTag: "N/A",
        isEmployed: true,
        technology: [
          {
            id: 2,
            name: "React",
            backgroundColor: "Red",
          },
        ],
        countryCode: 200,
        gradeId: 10,
        communityId: 13,
        employmentTypeId: 1,
        podId: 24,
        commentId: [1, 2, 3],
      },
    ];

    const expectedEnablee = {
      data: enableesList,
    };
    mockPost.mockResolvedValueOnce(expectedEnablee);
    const actualEnablee = await CreateEnablee(enableesList[0]);
    expect(actualEnablee.data).toEqual(expectedEnablee.data);
  });

  it("Should update enablee", async () => {
    const enableesList: IEnablee[] = [
      {
        employeeId: 10,
        firstName: "John",
        lastName: "Doe",
        dateOfJoin: new Date(1995, 11, 16).toString(),
        enablementStartDate: new Date(1995, 11, 18).toString(),
        enablementEndDate: new Date(1995, 12, 16).toString(),
        assetTag: "N/A",
        isEmployed: true,
        technology: [
          {
            id: 2,
            name: "React",
            backgroundColor: "Red",
          },
        ],
        countryCode: 200,
        gradeId: 10,
        communityId: 13,
        employmentTypeId: 1,
        podId: 24,
        commentId: [1, 2, 3],
      },
    ];

    const expectedEnablee = {
      data: enableesList,
    };

    mockPut.mockResolvedValueOnce(expectedEnablee);
    const actualEnablee = await UpdateEnablee(enableesList[0]);
    expect(actualEnablee.data).toEqual(expectedEnablee.data);
  });
});
