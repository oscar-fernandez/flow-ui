import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import PodAssignment from "../../../pages/Enablee/PodAssignment/PodAssignment";

describe("TableComponent", () => {
  beforeEach(() => {
    render(<PodAssignment />);
  });
  it("should render the table", () => {
    expect(screen.getByText("977284")).toBeTruthy();
  });
  it("should change row background color when clicked", () => {
    const row = screen.getByRole("cell", { name: "977284" }).closest("tr");
    expect(row).toBeTruthy();
    // console.log(prettyDOM(podAssignmentView.container));
    expect(row).toHaveStyle("background-color: #CCCCDA");
    row && fireEvent.click(row);
    expect(row).toHaveStyle("background-color: #000048");
    row && fireEvent.click(row);
    expect(row).toHaveStyle("background-color: #CCCCDA");
  });
});
