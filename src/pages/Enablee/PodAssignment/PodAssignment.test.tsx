import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PodAssignment from "./PodAssignment";

describe("PodAssignment", () => {
  it("should render title, table, button", () => {
    render(<PodAssignment />);
    expect(screen.getByText("Enablee")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "submit" })).toBeInTheDocument();
  });
});
