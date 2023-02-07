import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import {
  useAvailablePods,
  useCompletedPods,
  useActivePods,
  usePendingStartPods,
} from "./customHook";
import { mockFePod } from "../../../data/MockFEPod";
import {
  getAvailablePods,
  getCompletedPods,
  getActivePods,
  getPendingPods,
} from "../../../services/PodAPI";

vi.mock("../../../services/PodAPI");

describe("useCustomHook Pods tests", () => {
  const location = {
    hash: "",
    key: "cmgzl3g9",
    pathname: "/pod/active",
    search: "",
    state: null,
  };
  it("should get available pods on mount", async () => {
    const podList = {
      data: [...mockFePod],
    };

    const mockPods = getAvailablePods as jest.Mock;
    mockPods.mockResolvedValue(podList);

    const { result } = renderHook(() => useAvailablePods(location));
    await act(() => mockPods);
    expect(result.current[0]).toEqual(podList.data);
  });

  it("should get completed pods on mount", async () => {
    const podList = {
      data: [...mockFePod],
    };

    const mock = getCompletedPods as jest.Mock;
    mock.mockResolvedValue(podList);
    const { result } = renderHook(() => useCompletedPods(location));
    await act(() => mock);
    expect(result.current[0]).toEqual(podList.data);
  });

  it("should get active pods on mount", async () => {
    const podList = {
      data: [...mockFePod],
    };

    const mockActive = getActivePods as jest.Mock;
    mockActive.mockResolvedValue(podList);
    const { result } = renderHook(() => useActivePods(location));
    await act(() => mockActive);

    expect(result.current[0]).toEqual(podList.data);
  });

  it("should get pending start pods on mount", async () => {
    const getPodsPendingStartMock = getPendingPods as jest.Mock;
    getPodsPendingStartMock.mockResolvedValue({ data: mockFePod });
    const { result } = renderHook(() => usePendingStartPods(location));
    await act(() => getPodsPendingStartMock);
    expect(result.current[0]).toEqual(mockFePod);
  });
});
