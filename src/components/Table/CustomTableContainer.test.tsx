import { screen, render, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CustomTableContainer from "./CustomTableContainer";
const headers = ["Project Name", "Tech Stack"];
const rows = [["A"], ["B"]];
const skill = true;
const value = "Technology";

describe("TableView tests", () => {
  it("should render", () => {
    render(
      <CustomTableContainer
        headers={headers}
        rows={rows}
        skill={skill}
        value={value}
      />
    );
    expect(screen.getByTestId("table-container")).toBeInTheDocument();
  });
  it("should render headers", () => {
    render(
      <CustomTableContainer
        headers={headers}
        rows={rows}
        skill={skill}
        value={value}
      />
    );
    expect(screen.getByText("Project Name")).toBeInTheDocument();
  });
  it("should render rows", () => {
    render(
      <CustomTableContainer
        headers={headers}
        rows={rows}
        skill={skill}
        value={value}
      />
    );
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("should change row background color when clicked", () => {
    render(
      <CustomTableContainer
        headers={headers}
        rows={rows}
        skill={skill}
        value={value}
      />
    );
    const row = screen.getByRole("cell", { name: "A" }).closest("tr");
    expect(row).toBeTruthy();
    // console.log(prettyDOM(podAssignmentView.container));
    expect(row).toHaveStyle("background-color: #CCCCDA");
    row && fireEvent.click(row);
    expect(row).toHaveStyle("background-color: #000048");
    row && fireEvent.click(row);
    expect(row).toHaveStyle("background-color: #CCCCDA");
  });

  it("Should test the  handleNewTechnology method", () => {
    const utils = render(
      <CustomTableContainer
        headers={headers}
        rows={rows}
        skill={skill}
        value={value}
      />
    );
    const input = utils.getByTestId("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "foo" } });
    expect(input.value).toBe("foo");
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });
});
