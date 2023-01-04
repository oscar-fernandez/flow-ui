import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ManagementContainer from "./ManagementContainer";
import ManagementView from "./ManagementContainer";

describe("Management View page", () => {
  it("should display management view page with correct components", () => {
    render(<ManagementView />);
    expect(screen.getByText("Management")).toBeInTheDocument();
  });

  it("should toggle show form", () => {
    render(<ManagementContainer />);
    const button = screen.getByTestId("button") as HTMLButtonElement;
    fireEvent.click(button);
  });

  it("should handle tabs click and render appropriate view", () => {
    render(<ManagementContainer />);
    const technologyTab = screen.getByTestId("techTab");
    fireEvent.click(technologyTab);
    const addSkill = screen.getByTestId("button") as HTMLButtonElement;
    expect(addSkill.value).toBe("");
  });

  it("should handle row selection", () => {
    render(<ManagementContainer />);
    const row = screen.getByText("PixelGram");
    fireEvent.click(row);
    const title = screen.getByText("Project Details");
    expect(title).toBeInTheDocument();
    const backButton = screen.getByText("Back to Projects...");
    fireEvent.click(backButton);
  });

  it("should return correct headers", () => {
    render(<ManagementContainer />);
    const gradeTab = screen.getByText("Grade");
    fireEvent.click(gradeTab);
    const addSkill = screen.getByTestId("button") as HTMLButtonElement;
    expect(addSkill.value).toBe("");
  });

  it("should handle cancel on add project view", () => {
    render(<ManagementContainer />);
    const addButton = screen.getByTestId("button") as HTMLButtonElement;
    fireEvent.click(addButton);
    const cancelButton = screen.getByText("Cancel") as HTMLButtonElement;
    fireEvent.click(cancelButton);
  });

  it("should toggle edit", () => {
    render(<ManagementContainer />);
    const row = screen.getByText("PixelGram");
    fireEvent.click(row);
    const editButton = screen.getByText("Edit Project");
    fireEvent.click(editButton);
    const cancel = screen.getByText("Cancel");
    fireEvent.click(cancel);
  });
});
