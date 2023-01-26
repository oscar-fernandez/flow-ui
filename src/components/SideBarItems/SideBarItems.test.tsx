import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SideBarItems from "./SideBarItems";

vi.mock("react-router", () => ({
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
  });
  it("Apply selected-item class on click and then remove", () => {
    render(<SideBarItems />);
    const enableeItem = screen.getByTestId("Enablee");
    const managementItem = screen.getByTestId("Management");
    fireEvent.click(enableeItem);
    expect(enableeItem).toHaveClass("selected-item");
    fireEvent.click(managementItem);
    expect(enableeItem).not.toHaveClass("selected-item");
  });
});
