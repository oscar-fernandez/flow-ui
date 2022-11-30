import { describe, it, expect } from "vitest";
import {
  fireEvent,
  queryByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import ToggleSidebar from "./ToggleSidebar";
import { dummyEnablees } from "./Dummydata";
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
      details={dummyEnablees[0]}
    />
  );
};
