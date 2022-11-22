import { describe, it, expect } from "vitest";
import { queryByTestId, render, screen } from "@testing-library/react";
import Row from "./Row";

describe("Row tests", () => {
  it("Render test", () => {
    render(createRow([]));
  });

  it("Render test", () => {
    render(createRow([]));
    const tsText = screen.queryByTestId("tech-stack");
    expect(tsText).toBeEmpty();
  });

  it("Render test", () => {
    render(createRow(["Java"]));
    const tsText = screen.queryByTestId("tech-stack");
    // expect(tsText).toBeInTheDocument();
    expect(tsText?.innerHTML).toContain("Java");
  });

  it("Render test", () => {
    render(
      <Row
        id={0}
        firstName={""}
        lastName={""}
        techStack={["Java", "React", "Node.js"]}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const tsText = screen.queryByTestId("tech-stack");
    expect(tsText).toBeInTheDocument();
    expect(tsText?.innerHTML).toContain("...");
  });
});

const createRow = (arr: string[]) => {
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
