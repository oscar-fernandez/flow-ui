import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Row from "./Row";
import ITechnology from "../../models/interfaces/ITechnology";

describe("Row tests", () => {
  it("Render row", () => {
    render(createRow([]));
  });

  it("Renders the row but no text in tech stack portion", () => {
    render(createRow([]));
    const tsText = screen.queryByTestId("tech-stack");
    expect(tsText).toBeEmptyDOMElement();
  });

  it("Should render java in the component", () => {
    render(createRow([{ id: 1, name: "Java" }]));
    const tsText = screen.queryByTestId("tech-stack");
    expect(tsText?.innerHTML).toContain("Java");
  });

  it("Should render tooltip while rendering row component", async () => {
    render(
      createRow([
        { id: 1, name: "Java" },
        { id: 2, name: "React" },
        { id: 3, name: "Node.js" },
      ])
    );
    const tsText = screen.queryByTestId("tech-stack");
    tsText && userEvent.hover(tsText);
    await waitFor(() => screen.findByRole("tooltip"));
    expect(screen.getByText("Java, React, Node.js")).toBeInTheDocument();
  });

  it("should render ... when there is more than 3 elements", () => {
    render(
      createRow([
        { id: 1, name: "Java" },
        { id: 2, name: "React" },
        { id: 3, name: "Node.js" },
      ])
    );
    const tsText = screen.queryByTestId("tech-stack");
    expect(tsText).toBeInTheDocument();
    expect(tsText?.innerHTML).toContain("...");
  });
});

const createRow = (arr: ITechnology[]) => {
  return (
    <Row
      id={0}
      firstName={""}
      lastName={""}
      techStack={arr}
      onClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
