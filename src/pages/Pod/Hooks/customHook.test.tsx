import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { useAvailablePods } from "./customHook";
import { mockFePod } from "../../../data/MockFEPod";

describe("useAvailablePods hook tests", async () => {
  it("should get available pods on mount", async () => {
    const mockFePodData = mockFePod;
    const { result } = renderHook(() => useAvailablePods());

    expect(result.current[0]).toEqual(mockFePodData);
  });
});
