import { fireEvent, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FormComponent from "../../../components/FormComponent/FormComponent";
import ManagementContainer from "./ManagementContainer";
import ManagementView from "./ManagementContainer";

describe("Management View page", () => {
  it("should display management view page with correct components", () => {
    render(<ManagementView />);
  });

  it("should toggle show form", () => {
    const utils = render(<ManagementContainer />);
    const button = utils.getByTestId("button") as HTMLButtonElement;
    fireEvent.click(button);
  });

  it("should handle tabs click and render appropriate view", () => {
    const utils = render(<ManagementContainer />);
    const technologyTab = utils.getByTestId("techTab");
    fireEvent.click(technologyTab);
    const addSkill = utils.getByTestId("button") as HTMLButtonElement;
    expect(addSkill.value).toBe("");
  });

  it("should handle row selection", () => {
    const utils = render(<ManagementContainer />);
    const row = utils.getByText("PixelGram");
    fireEvent.click(row);
    const title = utils.getByText("Project Details");
    expect(title).toBeInTheDocument();
    const backButton = utils.getByText("Back to Projects...");
    fireEvent.click(backButton);
  });

  it("should return correct headers", () => {
    const utils = render(<ManagementContainer />);
    const gradeTab = utils.getByText("Grade");
    fireEvent.click(gradeTab);
    const addSkill = utils.getByTestId("button") as HTMLButtonElement;
    expect(addSkill.value).toBe("");
  });

  it("should handle cancel on add project view", () => {
    const utils = render(<ManagementContainer />);
    const addButton = utils.getByTestId("button") as HTMLButtonElement;
    fireEvent.click(addButton);
    const cancelButton = utils.getByText("Cancel") as HTMLButtonElement;
    fireEvent.click(cancelButton);
  });

  it("should toggle edit", () => {
    const utils = render(<ManagementContainer />);
    const row = utils.getByText("PixelGram");
    fireEvent.click(row);
    const editButton = utils.getByText("Edit Project");
    fireEvent.click(editButton);
    const cancel = utils.getByText("Cancel");
    fireEvent.click(cancel);
  });
});
