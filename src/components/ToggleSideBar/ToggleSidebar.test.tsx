import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ToggleSidebar, { Action } from "./ToggleSidebar";
describe("Sidebar tests", () => {
  it("should create sideBar", () => {
    render(createSidebar(true));
  });

  it("drawer should be null", () => {
    render(createSidebar(false));
    const drawer = screen.queryByTestId("drawer");
    expect(drawer).not.toBeInTheDocument();
  });

  it("drawer should not be null on action", () => {
    render(createSidebar(true));
    const drawer = screen.queryByTestId("drawer");
    expect(drawer).toBeInTheDocument();
  });
});

const createSidebar = (toggle: boolean) => {
  const setTog = (tog: boolean) => tog;
  return (
    <ToggleSidebar
      toggle={toggle}
      setToggle={setTog}
      details={{
        employeeId: 977284,
        firstName: "Steve",
        lastName: "Bob",
        dateOfJoin: new Date().toDateString(),
        enablementStartDate: new Date().toDateString(),
        enablementEndDate: new Date().toDateString(),
        assetTag: "I Don't know",
        isEmployed: false,
        technology: [
          { id: 2, name: "Java", backgroundColor: "grey" },
          { id: 8, name: "React", backgroundColor: "blue" },
          { id: 12, name: "Rust", backgroundColor: "brown" },
          { id: 12, name: "C++", backgroundColor: "yellow" },
        ],
        countryCode: 1,
        gradeId: 1,
        communityId: 1,
        employmentTypeId: 1,
        podId: 1,
        commentId: [1, 2, 3],
      }}
      action={Action.ADD}
    />
  );
};
