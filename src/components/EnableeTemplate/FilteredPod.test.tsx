import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FilteredPod from "./FilteredPod";
import { mockTechnology } from "../../data/MockData";

describe("FilteredPod tests", () => {
  it("should render", () => {
    render(
      <FilteredPod
        podName={"pod"}
        podTech={mockTechnology}
        enableeTech={mockTechnology}
      />
    );
    expect(screen.getByText("pod")).toBeInTheDocument();
  });
});
