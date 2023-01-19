import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { useAvailablePods, useCompletedPods } from "./customHook";
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
});
