import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MockRows, MockData } from "../../../data/MockData";
import ManagementTableComponent from "../ManagementTableComponent/ManagementTableComponent";

describe("ManagementTableComponent", () => {
  beforeEach(() => {
    render(
      <ManagementTableComponent
        selectedItem={[]}
        columns={MockData}
        rows={MockRows}
      />
    );
  });
  it("should render the table", () => {
    expect(screen.getByText("what")).toBeTruthy();
  });
  it("click row", () => {
    const row = screen.getByRole("cell", { name: "what" }).closest("tr");
    expect(row).toBeTruthy();
    row && fireEvent.click(row);
  });
});
