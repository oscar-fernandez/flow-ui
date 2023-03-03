import { describe, vi, it, expect } from "vitest";
import { EnablerPageContainer } from "./EnablerPageContainer";
import { GetAllEnablersHook } from "../Hooks/customHook";
import { MemoryRouter } from "react-router";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockIFEnabler } from "../../../data/MockIFEnabler";

vi.mock("../Hooks/customHook");
const mockGetAllEnablers = GetAllEnablersHook as jest.Mock;
const enablers = [mockIFEnabler, vi.fn(() => null)];
mockGetAllEnablers.mockReturnValue(enablers);

describe("EnablerPageContainer", () => {
  it("renders component with correct enablers using hook", () => {
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

  it("should display total assigned pods and status tag for enabler", () => {
    render(
      <MemoryRouter>
        <EnablerPageContainer
          hook={GetAllEnablersHook}
          displayPageCarousel={false}
        />
      </MemoryRouter>
    );
    const enablersStatus = screen.getAllByTestId("status-tag");
    const enablersTotalPods = screen.getAllByTestId("total-assigned-pods");
    expect(enablersStatus[0]).toHaveTextContent("Pending Pod Start");
    expect(enablersTotalPods[0]).toHaveTextContent("1");
  });
});
