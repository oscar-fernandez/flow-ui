import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TableComponent from "./TableComponent";
import { MockData, MockRows } from "../../data/MockData";

describe("TableComponent", () => {
  beforeEach(() => {
    render(
      <TableComponent columns={MockData} rows={MockRows} selectedItems={[]} />
    );
  });
  it("checkboxes should check and uncheck when clicked", () => {
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    fireEvent.click(checkboxes[1]);
    expect(checkboxes[1]).not.toBeChecked();
  });

  it("should render date passed through props", () => {
    expect(screen.getByText(MockRows[0].thing)).toBeInTheDocument();
  });
});
