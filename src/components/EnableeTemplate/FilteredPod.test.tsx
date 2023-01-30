import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import FilteredPod from "./FilteredPod";
import { mockTechnology } from "../../data/MockData";
import { mockFePod } from "../../data/MockFEPod";

describe("FilteredPod tests", () => {
  const mockFn = vi.fn();
  it("should render", () => {
    render(
      <FilteredPod
        pod={mockFePod[0]}
        enableeTech={mockTechnology}
        selectedPod={undefined}
        handleOnClick={mockFn}
      />
    );
    expect(screen.getByText(mockFePod[0].podName)).toBeInTheDocument();
  });

  it("should handle checkbox toggle", () => {
    render(
      <FilteredPod
        pod={mockFePod[0]}
        enableeTech={mockTechnology}
        selectedPod={undefined}
        handleOnClick={mockFn}
      />
    );
    const checkbox = screen.getByTestId(
      mockFePod[0].podName
    ) as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("should set selected pod", () => {
    render(
      <FilteredPod
        pod={mockFePod[1]}
        enableeTech={mockTechnology}
        selectedPod={mockFePod[1]}
        handleOnClick={mockFn}
      />
    );
    const checkbox = screen.getByTestId(
      mockFePod[1].podName
    ) as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
  });
});
