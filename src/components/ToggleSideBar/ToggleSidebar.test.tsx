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
    expect(drawer).toBeNull();
  });

  it("drawer should not be null on action", () => {
    render(createSidebar(true));
    const drawer = screen.queryByTestId("drawer");
    expect(drawer).not.toBeNull();
  });
});

const createSidebar = (toggle: boolean) => {
  const setTog = (tog: boolean) => {};
  return (
    <ToggleSidebar
      toggle={toggle}
      setToggle={setTog}
      details={{
        employeeId: 977284,
        firstName: "Steve",
        lastName: "Bob",
        dateOfJoin: new Date(),
        enablementStartDate: new Date(),
        enablementEndDate: new Date(),
        assetTag: "I Don't know",
        isEmployed: false,
        technology: [
          { id: 2, name: "Java" },
          { id: 8, name: "React" },
          { id: 12, name: "Rust" },
          { id: 12, name: "C++" },
        ],
        countryCode: 1,
        gradeId: 1,
        communityId: 1,
        employementTypeId: 1,
        podId: 1,
        commentId: [1, 2, 3],
      }}
      action={Action.ADD}
    />
  );
};
