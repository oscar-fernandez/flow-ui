import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EnablerView from "./EnablerView";
import { MemoryRouter } from "react-router";

describe("Enabler View tests", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <EnablerView />
      </MemoryRouter>
    );
    expect(screen.getByText("Enablers")).toBeInTheDocument();
  });
});
