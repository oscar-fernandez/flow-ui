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
    const projectName = document.getElementById(
      "projectName"
    ) as HTMLInputElement;
    const repoLink = document.getElementById("link") as HTMLInputElement;
    const summary = document.getElementById("summary") as HTMLInputElement;
    const resetButton = screen.getByTestId("reset");

    projectName.value = "test";
    repoLink.value = "test";
    summary.value = "test";

    resetButton.click();

    expect(projectName.value).toBe("");
    expect(repoLink.value).toBe("");
    expect(summary.value).toBe("");
  });

  it("should create tech stack string array", () => {
    const utils = render(<FormComponent />);
    const select = utils.getByTestId("select") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "Java" } });
    expect(select.value).toBe("Java");
  });
});
