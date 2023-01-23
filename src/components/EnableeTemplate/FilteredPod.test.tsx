import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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

  it("should handle checkbox toggle", () => {
    render(
      <FilteredPod
        podName={"pod"}
        podTech={mockTechnology}
        enableeTech={mockTechnology}
      />
    );
    const checkbox = screen.getByTestId("selectedPod") as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
