import { vi, describe, it, expect } from "vitest";
import { GetAllEnablersHook } from "./customHook";
import { act, renderHook } from "@testing-library/react";
import { mockIFEnabler } from "../../../data/MockIFEnabler";
import { getAllEnablers } from "../../../services/EnablerAPI";

vi.mock("../../../services/EnablerAPI");

describe("customHook tests", async () => {
  const enablersList = { data: [...mockIFEnabler] };

  const location = {
    hash: "",
    key: "cmgzl3g9",
    pathname: "/enabler",
    search: "",
    state: null,
  };

  it("should get all enablers through an API call", async () => {
    const mockCall = getAllEnablers as jest.Mock;
    mockCall.mockResolvedValue(enablersList);

    const { result } = renderHook(() => GetAllEnablersHook(location.pathname));

    await act(() => mockCall);

    expect(result.current[0]).toEqual([...enablersList.data]);
  });
});
