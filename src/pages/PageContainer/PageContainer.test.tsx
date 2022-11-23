import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageContainer from "./PageContainer";

describe("PageContainer", () => {
  it("should contain 'Menu-side-bar'", () => {
    render(<PageContainer />);
    expect(screen.getByText("Menu-side-bar")).toBeInTheDocument();
    expect(screen.getByText("Flow-E")).toBeInTheDocument();
  });
});
