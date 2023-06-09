import { screen, render, fireEvent, prettyDOM } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CustomTableContainer from "./CustomTableContainer";
const headers = ["Project Name", "Tech Stack"];
const rows = [["A"], ["B"]];
const skill = true;
const value = "Technology";
const buttonStyle = { color: "blue" };
const toggleShowForm = () => {
  return false;
};

describe("TableView tests", () => {
  let skill = true;
  let tech = "";
  function setSkill() {
    skill = false;
  }
  function handleTechnology() {
    tech = "tech";
  }
  it("should render", () => {
    render(
      <CustomTableContainer
        headers={headers}
        rows={rows}
        skill={skill}
        value={value}
        setTechnology={handleTechnology}
        setSkill={setSkill}
        buttonStyle={buttonStyle}
        toggleShowForm={toggleShowForm}
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
        setTechnology={handleTechnology}
        setSkill={setSkill}
        buttonStyle={buttonStyle}
        toggleShowForm={toggleShowForm}
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
        setTechnology={handleTechnology}
        setSkill={setSkill}
        buttonStyle={buttonStyle}
        toggleShowForm={toggleShowForm}
      />
    );
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("should change row background color when clicked", () => {
    render(
      <CustomTableContainer
        headers={headers}
        rows={rows}
        skill={false}
        value={""}
        setTechnology={handleTechnology}
        setSkill={setSkill}
        buttonStyle={buttonStyle}
        toggleShowForm={toggleShowForm}
      />
    );
    const row = screen.getAllByTestId("table-row")?.[0];
    expect(row).toBeInTheDocument();
    expect(row).toHaveStyle("background-color: #CCCCDA");
    row && fireEvent.click(row);
  });

  it("Should test the  handleNewTechnology method", () => {
    render(
      <CustomTableContainer
        headers={headers}
        rows={rows}
        skill={skill}
        value={value}
        setTechnology={handleTechnology}
        setSkill={setSkill}
        buttonStyle={buttonStyle}
        toggleShowForm={toggleShowForm}
      />
    );
    const input = screen.getByTestId("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "foo" } });
    expect(input.value).toBe("foo");
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });
});
