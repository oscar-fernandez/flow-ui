import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import {
  useAvailablePods,
  useCompletedPods,
  useActivePods,
  usePendingStartPods,
} from "./customHook";
import { mockFePod } from "../../../data/MockFEPod";
import { getCompletedPods, getPendingPods } from "../../../services/PodAPI";

vi.mock("../../../services/PodAPI");

describe("useCustomHook Pods tests", () => {
  it("should get available pods on mount", async () => {
    const mockFePodData = mockFePod;
    const { result } = renderHook(() => useAvailablePods());

    expect(result.current.podList).toEqual(mockFePodData);
  });

  it("should get completed pods on mount", async () => {
    const podList = {
      data: [...mockFePod],
    };

    const mock = getCompletedPods as jest.Mock;
    mock.mockResolvedValue(podList);
    const { result } = renderHook(() => useCompletedPods());
    await act(() => mock);
    expect(result.current.podList).toEqual(podList.data);
  });

  it("should get active pods on mount", async () => {
    const mockFePodData = mockFePod.filter(
      (pod) =>
        Date.parse(pod.podStartDate) <= Date.now() &&
        Date.parse(pod.podEndDate) >= Date.now()
    );
    const { result } = renderHook(() => useActivePods());

    expect(result.current.podList).toEqual(mockFePodData);
  });

  it("should get pending start pods on mount", async () => {
    const getPodsPendingStartMock = getPendingPods as jest.Mock;
    getPodsPendingStartMock.mockResolvedValue({ data: mockFePod });
    const { result } = renderHook(() => usePendingStartPods());
    await act(() => getPodsPendingStartMock);
    expect(result.current.pendingStartPods).toEqual(mockFePod);
  });
});
