import { getByText, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FormComponent from "./FormComponent";

describe("FormComponent", () => {
  it("should render form component", () => {
    render(<FormComponent />);
    expect(screen.getByTestId("title")).toBeInTheDocument();
  });
});
