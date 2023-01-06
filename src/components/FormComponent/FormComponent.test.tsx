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
    const projectName = screen.getByTestId("pName") as HTMLInputElement;
    const repoLink = screen.getByTestId("pLink") as HTMLInputElement;
    const summary = screen.getByTestId("pDesc") as HTMLInputElement;

    const resetButton = screen.getByTestId("resetButton");

    projectName.value = "test";
    repoLink.value = "test";
    summary.value = "test";

    resetButton.click();

    expect(projectName.value).toBe("test");
    expect(repoLink.value).toBe("test");
    expect(summary.value).toBe("test");
  });

  // it("should create tech stack string array", () => {
  //   render(<FormComponent />);
  //   const select = screen.getByTestId("select") as HTMLSelectElement;
  //   fireEvent.change(select, { target: { value: "Java" } });
  //   expect(select.value).toBe("Java");
  // });
});
