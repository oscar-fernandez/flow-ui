import { describe, vi, it, expect } from "vitest";
import { EnablerPageContainer } from "./EnablerPageContainer";
import { GetAllEnablersHook } from "../Hooks/customHook";
import { mockEnabler } from "../../../data/MockEnabler";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";

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
});
