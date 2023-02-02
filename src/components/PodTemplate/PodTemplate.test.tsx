import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import PodTemplate from "./PodTemplate";

describe("PodTemplate tests", () => {
  it("should render pod template", () => {
    render(<PodTemplate />);
    const sub = screen.getByText("Submit");
    expect(sub);
  });

  it("should handle name change", () => {
    render(<PodTemplate />);
    const nameInput = screen.getByTestId("podName") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(nameInput.value).toBe("test");
    fireEvent.change(nameInput, { target: { value: "" } });
    const err = screen.getByText("* Pod Name required");
    expect(err);
  });

  //render the list of projects
  it("should render the list of projects", async () => {
    render(<PodTemplate />);
    const dataBtn = screen.getByTestId("projectsBtn");
    await userEvent.click(dataBtn);
    const flow = screen.getByText("Flow");
    await userEvent.click(flow);
    const project = screen.getByText("Flow");
    expect(project);
  });
});
