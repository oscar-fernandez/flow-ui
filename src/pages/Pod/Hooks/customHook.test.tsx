import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import {
  useAvailablePods,
  useCompletedPods,
  useActivePods,
} from "./customHook";
import { mockFePod } from "../../../data/MockFEPod";

describe("useCustomHook Pods tests", async () => {
  it("should get available pods on mount", async () => {
    const mockFePodData = mockFePod;
    const { result } = renderHook(() => useAvailablePods());

    expect(result.current[0]).toEqual(mockFePodData);
  });

  it("should get completed pods on mount", async () => {
    const mockFePodData = mockFePod;
    const { result } = renderHook(() => useCompletedPods());

    expect(result.current.completedPods).toEqual(mockFePodData);
  });

  it("should get active pods on mount", async () => {
    const mockFePodData = mockFePod.filter(
      (pod) =>
        Date.parse(pod.podStartDate) <= Date.now() &&
        Date.parse(pod.podEndDate) >= Date.now()
    );
    const { result } = renderHook(() => useActivePods());

    expect(result.current[0]).toEqual(mockFePodData);
  });
});
