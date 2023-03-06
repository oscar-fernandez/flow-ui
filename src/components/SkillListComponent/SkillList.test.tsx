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
});
