import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ToggleSideBar from "./ToggleSidebar";
import { ToggleContext } from "../../context/ToggleSideBarContext/ToggleSideBarContext";

const ChildComp: React.FC = () => <h2>This is a child component</h2>;

describe("ToggleSideBar", () => {
  it("Should render", () => {
    render(
      <ToggleContext.Provider value={[true, () => false]}>
        <ToggleSideBar template={<ChildComp />} />
      </ToggleContext.Provider>
    );
    expect(screen.getByTestId("drawer")).toBeInTheDocument();
    expect(screen.getByText("This is a child component")).toBeInTheDocument();
  });

  it("Should close the drawer", () => {
    render(
      <ToggleContext.Provider value={[true, () => false]}>
        <ToggleSideBar template={<ChildComp />} />
      </ToggleContext.Provider>
    );
    const exitButton = screen.getByTestId("close-btn");
    fireEvent.click(exitButton);
    expect(screen.getByText("This is a child component")).toBeInTheDocument();
  });
});
