import { describe, vi, it, expect } from "vitest";
import { EnablerPageContainer } from "./EnablerPageContainer";
import { GetAllEnablersHook } from "../Hooks/customHook";
import { mockEnabler } from "../../../data/MockEnabler";
import { MemoryRouter } from "react-router";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockIFEnabler } from "../../../data/MockIFEnabler";

vi.mock("../Hooks/customHook");

describe("EnablerPageContainer", () => {
  it("renders component with correct enablers using hook", () => {
    const mockGetAllEnablers = GetAllEnablersHook as jest.Mock;

    const enablers = [mockEnabler, vi.fn(() => null)];
    mockGetAllEnablers.mockReturnValue(enablers);
    render(
      <MemoryRouter initialEntries={["/enablee/pendingStart"]}>
        <EnablerPageContainer
          hook={GetAllEnablersHook}
          displayPageCarousel={false}
        />
      </MemoryRouter>
    );
    expect(
      screen.queryByRole("button", {
        name: "Next page",
      })
    ).not.toBeInTheDocument();
  });

  it("should handle enabler row click", () => {
    const mockGetAllEnablers = GetAllEnablersHook as jest.Mock;
    const enablers = [mockIFEnabler, vi.fn(() => null)];
    mockGetAllEnablers.mockReturnValue(enablers);
    render(
      <MemoryRouter initialEntries={["/enablee/pendingStart"]}>
        <EnablerPageContainer
          hook={GetAllEnablersHook}
          displayPageCarousel={false}
        />
      </MemoryRouter>
    );
    //clicking on row for coverage
    const enablerRow = screen.getAllByTestId("rowTest");
    fireEvent.click(enablerRow[0]);
  });
});
