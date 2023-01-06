import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TableInput from "./TableInput";

describe("TableInput tests", () => {
  it("should render form component", () => {
    let skill = true;
    let tech = "";
    function setSkill() {
      skill = false;
    }
    function setTechnology() {
      tech = "tech";
    }
    render(
      <TableInput
        skill={skill}
        setTechnology={setTechnology}
        setSkill={setSkill}
      />
    );
    const input = screen.getByTestId("input") as HTMLInputElement;
    fireEvent.keyDown(input, { key: "A", code: "KeyA" });
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });
    expect(input.value).toBe("");
  });
});
