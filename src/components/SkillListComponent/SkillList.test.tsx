import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SkillListComponent } from "./SkillListComponent";
import { mockTechnology } from "../../data/MockData";

describe("Skill List Tests", () => {
  it("Calls the handleNewSkill function when the input field is clicked", () => {
    //change this prop to a different mock
    render(
      <SkillListComponent assignedSkills={mockTechnology}></SkillListComponent>
    );

    const input = screen.getByTestId("skillAddBtn");

    fireEvent.click(input);
  });

  it("Displays the correct filtered technologies when the value of the input field changes", async () => {
    render(
      <SkillListComponent assignedSkills={mockTechnology}></SkillListComponent>
    );
    const input = screen.getByTestId("skillAddBtn");
    fireEvent.click(input);
    const inputField = screen.getByPlaceholderText("Search For Skills");
    fireEvent.change(inputField, { target: { value: "j" } });

    expect(screen.getByText("Java")).toBeInTheDocument();

    fireEvent.change(inputField, { target: { value: "" } });

    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("should fire handleNewTech when a tech is selected from the dropdown", () => {
    render(
      <SkillListComponent assignedSkills={mockTechnology}></SkillListComponent>
    );
    const input = screen.getByTestId("skillAddBtn");
    fireEvent.click(input);
    const inputField = screen.getByPlaceholderText("Search For Skills");
    fireEvent.change(inputField, { target: { value: "j" } });

    expect(screen.getByText("Java")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Java"));
    fireEvent.change(inputField, { target: { value: "" } });
    fireEvent.click(screen.getByText("React"));
    fireEvent.click(screen.getByText("Complete Selection"));
    fireEvent.click(input);
  });
});
