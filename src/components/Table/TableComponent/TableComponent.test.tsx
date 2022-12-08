import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import PodAssignment from "../../../pages/Enablee/PodAssignment/PodAssignment";
import { dummyEnablees } from "../../../data/EnableeMock";
import IColumns from "../../../models/interfaces/IColumns";
import TableComponent from "./TableComponent";
import IEnablee from "../../../models/interfaces/IEnablee";
import IEnableeTable from "../../../models/interfaces/IEnableeTable";

const enableeColumn: IColumns = {
  topics: [
    "id",
    "firstName",
    "lastName",
    "techStack",
    "enablementStartDate",
    "enablementEndDate",
  ],
};

const updatedEnablees = dummyEnablees.map((enablee: IEnablee) => {
  const updatedEnablee: IEnableeTable = {
    id: enablee.employeeId.toString(),
    firstName: enablee.firstName,
    lastName: enablee.lastName,
    techStack: enablee.technology,
    enablementStartDate: enablee.enablementStartDate,
    enablementEndDate: enablee.enablementEndDate,
  };
  return updatedEnablee;
});

describe("TableComponent", () => {
  beforeEach(() => {
    render(
      <TableComponent
        selectedItems={[]}
        columns={enableeColumn}
        rows={updatedEnablees}
      />
    );
  });
  it("should render the table", () => {
    expect(screen.getByText("Steve")).toBeTruthy();
  });
  it("should change row background color when clicked", () => {
    const row = screen.getByRole("cell", { name: "Steve" }).closest("tr");
    expect(row).toBeTruthy();
    // console.log(prettyDOM(podAssignmentView.container));
    expect(row).toHaveStyle("background-color: #CCCCDA");
    row && fireEvent.click(row);
    expect(row).toHaveStyle("background-color: #000048");
    row && fireEvent.click(row);
    expect(row).toHaveStyle("background-color: #CCCCDA");
  });
});
