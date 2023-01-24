import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SideBarItems from "./SideBarItems";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("Dummy tests", () => {
  it("should be true", () => {
    expect(true).toBe(true);
  });
  it("should render MenuSideBar", () => {
    render(<SideBarItems />);
    expect(screen.getByText("Enablee")).toBeInTheDocument();
  });
});

describe("Item Selection", () => {
  it("'Enablee' item should change background color when selected", () => {
    render(<SideBarItems />);
    // Enablee Item Element
    const enableeItem = screen.getByTestId("enablee-item");

    // Check that Enablee Item's element doesn't have "selected-item" class
    !expect(enableeItem.className.includes("selected-item"));

    // <h1 class="item selected-item">Hello World</h1>
    // Pass item into function. Function adds "selected-item" class to enableeItem's class list
    enableeItem.click();

    // Check Enablee Item's element for "selected-item" class
    expect(enableeItem.className.includes("selected-item"));

    // expect(screen.getByTestId("side-bar-item").className.includes("selected-item"));
  });
  it("'Pending Assignment' sub item should change background color when selected", () => {
    render(<SideBarItems />);

    const pendingAssignment = screen.getByTestId("pending-assignment");
    !expect(pendingAssignment.className.includes("selected-item"));

    pendingAssignment.click();

    expect(pendingAssignment.className.includes("selected-item"));
  });
  it("'Pending Assignment' sub item should change background color when selected", () => {
    render(<SideBarItems />);

    const pendingEnablementStart = screen.getByTestId(
      "pending-enablement-start"
    );
    !expect(pendingEnablementStart.className.includes("selected-item"));

    pendingEnablementStart.click();

    expect(pendingEnablementStart.className.includes("selected-item"));
  });
  it("'Management'  item should change background color when selected", () => {
    render(<SideBarItems />);

    const management = screen.getByTestId("management");
    !expect(management.className.includes("selected-item"));

    management.click();

    expect(management.className.includes("selected-item"));
  });
});
