import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import {
  useAvailablePods,
  useCompletedPods,
  useActivePods,
} from "./customHook";
import { mockFePod } from "../../../data/MockFEPod";
import {
  getAvailablePods,
  getCompletedPods,
  getActivePods,
} from "../../../services/PodAPI";

vi.mock("../../../services/PodAPI");

describe("useCustomHook Pods tests", async () => {
  it("should get available pods on mount", async () => {
    const podList = {
      data: [...mockFePod],
    };

    const mockPods = getAvailablePods as jest.Mock;
    mockPods.mockResolvedValue(podList);

    const { result } = renderHook(() => useAvailablePods());
    await act(() => mockPods);
    expect(result.current.podList).toEqual(podList.data);
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
    /* const mockFePodData = mockFePod.filter(
      (pod) =>
        Date.parse(pod.podStartDate) <= Date.now() &&
        Date.parse(pod.podEndDate) >= Date.now()
    );
    const { result } = renderHook(() => useActivePods());  */

    const podList = {
      data: [...mockFePod],
    };

    const mockActive = getActivePods as jest.Mock;
    mockActive.mockResolvedValue(podList);
    const { result } = renderHook(() => useActivePods());
    await act(() => mockActive);

    expect(result.current.podList).toEqual(podList.data);
  });
});
