import { renderHook, act } from "@testing-library/react";
import { GetPaginatedEnablees } from "../../../services/EnableeAPI";
import { useAllEnablees } from "./useAllEnablees";
import { vi, describe, it, expect } from "vitest";
import { dummyEnablees } from "../../../data/EnableeMock";

vi.mock("../../../services/EnableeAPI");

describe("useAllEnablees hook", () => {
  const enableePage = {
    data: [
      {
        items: dummyEnablees,
        hasNext: false,
        totalElements: 5,
      },
    ],
  };
  const location = {
    hash: "",
    key: "cmgzl3g9",
    pathname: "/enablee",
    search: "",
    state: null,
  };

  it("should make an API call on mount", async () => {
    const getPaginatedEnableesMock = GetPaginatedEnablees as jest.Mock;
    getPaginatedEnableesMock.mockResolvedValue(enableePage);
    const { result } = renderHook(() => useAllEnablees(location.pathname));
    await act(() => getPaginatedEnableesMock);
    expect(result.current[0]).toEqual(enableePage.data);
  });
});
