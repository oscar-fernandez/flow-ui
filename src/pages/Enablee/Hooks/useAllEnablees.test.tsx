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

  it("should make an API call on mount", async () => {
    const getPaginatedEnableesMock = GetPaginatedEnablees as jest.Mock;
    getPaginatedEnableesMock.mockResolvedValue(enableePage);
    const { result } = renderHook(() => useAllEnablees());
    await act(() => getPaginatedEnableesMock);
    expect(result.current.enablees).toEqual(enableePage.data);
  });
});
