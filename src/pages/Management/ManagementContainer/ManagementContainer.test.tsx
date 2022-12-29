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
  });
});
