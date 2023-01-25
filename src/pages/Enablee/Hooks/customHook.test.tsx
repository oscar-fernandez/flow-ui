import { renderHook, act } from "@testing-library/react";
import { GetEnableesPendingPodAssignment } from "../../../services/EnableeAPI";
import { usePendingPodEnablees } from "./customHook";
import { vi, describe, it, expect } from "vitest";
import { dummyEnablees } from "../../../data/EnableeMock";

vi.mock("../../../services/EnableeAPI");

describe("usePendingPodEnablees hook tests", async () => {
  const enableesList = {
    data: [
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
    ],
  };
  it("should make an API call on mount", async () => {
    const mock = GetEnableesPendingPodAssignment as jest.Mock;
    mock.mockResolvedValue(enableesList);

    const { result } = renderHook(() => usePendingPodEnablees());

    await act(() => mock);

    expect(result.current.receivedEnablees).toEqual([
      ...enableesList.data,
      dummyEnablees[0], //temp
      dummyEnablees[1], //temp
    ]);
  });
});
