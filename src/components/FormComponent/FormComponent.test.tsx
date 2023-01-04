import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FormComponent from "./FormComponent";

describe("FormComponent", () => {
  it("should render form component", () => {
    render(<FormComponent />);
    expect(screen.getByTestId("title")).toBeInTheDocument();
  });

  it("should clear input fields on reset click", () => {
    render(<FormComponent edit={false} />);
    const projectName = screen.getByPlaceholderText(
      "project name"
    ) as HTMLInputElement;
    const repoLink = screen.getByPlaceholderText(
      "link to project repository"
    ) as HTMLInputElement;
    const summary = screen.getByPlaceholderText(
      "project summary"
    ) as HTMLInputElement;
    const resetButton = screen.getByTestId("reset");

    projectName.value = "test";
    repoLink.value = "test";
    summary.value = "test";

    resetButton.click();

    expect(projectName.value).toBe("");
    expect(repoLink.value).toBe("");
    expect(summary.value).toBe("");
  });

  // it("should create tech stack string array", () => {
  //   render(<FormComponent />);
  //   const select = screen.getByTestId("select") as HTMLSelectElement;
  //   fireEvent.change(select, { target: { value: "Java" } });
  //   expect(select.value).toBe("Java");
  // });
});
