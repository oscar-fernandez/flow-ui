import { describe, it, expect } from "vitest";
import {
  fireEvent,
  queryByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import ToggleSidebar from "./ToggleSidebar";
describe("Sidebar tests", () => {
  it("should create sideBar", () => {
    render(createSidebar());
  });

  it("drawer should be null", () => {
    render(createSidebar());
    const drawer = screen.queryByTestId("drawer");
    expect(drawer).toBeNull();
  });

  it("drawer should not be null on action", () => {
    render(createSidebar());
    const drawer = screen.queryByTestId("drawer");
    expect(drawer).toBeNull();
  });
});

const createSidebar = (arr?: string[]) => {
  return <ToggleSidebar />;
};
