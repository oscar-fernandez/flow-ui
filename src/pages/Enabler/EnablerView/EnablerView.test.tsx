import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EnablerView from "./EnablerView";

describe("Enabler View tests", () => {
  it("should render", () => {
    render(<EnablerView />);
    expect(screen.getByText("Enablers")).toBeInTheDocument();
  });
});
