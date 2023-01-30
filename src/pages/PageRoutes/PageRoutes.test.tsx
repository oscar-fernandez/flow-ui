import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PageRoutes from "./PageRoutes";
import { useCompletedPods } from "../Pod/Hooks/customHook";
import { mockFePod } from "../../data/MockFEPod";

vi.mock("../Pod/Hooks/customHook");

describe("PageRoutes", () => {
  it("should contain 'page-routes' class", () => {
    render(<PageRoutes />);
    expect(screen.getByText("Andrew")).toBeInTheDocument();
  });

  it("should show no tag for completed pod", async () => {
    const mockUseCompletedPods = useCompletedPods as jest.Mock;
    mockUseCompletedPods.mockReturnValueOnce({ podList: mockFePod });

    render(<PageRoutes />);

    fireEvent.click(screen.getByText("Pod"));
    fireEvent.click(screen.getByText("Completed Pod"));

    await waitFor(() => {
      expect(screen.queryAllByTestId("tag-name")?.[2]).toBeEmptyDOMElement();
    });
  });
});
