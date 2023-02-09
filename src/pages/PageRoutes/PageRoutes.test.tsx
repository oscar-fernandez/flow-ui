import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PageRoutes from "./PageRoutes";
import { useCompletedPods } from "../Pod/Hooks/customHook";
import { mockFePod } from "../../data/MockFEPod";
import IFEPod from "../../models/interfaces/IFEPod";

vi.mock("../Pod/Hooks/customHook");

describe("PageRoutes", () => {
  it("should contain 'page-routes' class", () => {
    render(<PageRoutes />);
    expect(screen.getByText("Andrew")).toBeInTheDocument();
  });

  it("should show no tag for completed pod", () => {
    const mockCompletedPod = mockFePod[0];
    mockCompletedPod.podStartDate = "2022-Dec-30";
    mockCompletedPod.podEndDate = "2022-Dec-31";

    const mockUseCompletedPods = useCompletedPods as jest.Mock;
    const mockUpdatePodListFn = vi.fn((list: IFEPod[]) => []);

    mockUseCompletedPods.mockReturnValue([
      [mockCompletedPod],
      mockUpdatePodListFn,
    ]);

    render(<PageRoutes />);

    fireEvent.click(screen.getByText("Completed"));

    const tags = screen.queryAllByTestId("tag-name");
    expect(tags).not.toContain("Active");
    expect(tags).not.toContain("Pending");
    expect(tags).not.contain("Available");
  });
});
