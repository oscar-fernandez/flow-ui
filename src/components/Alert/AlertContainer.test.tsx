import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AlertContainer from "./AlertContainer";

describe("AlertContainer tests", () => {
  it("should render", () => {
    render(<AlertContainer text="text" buttonText="button"></AlertContainer>);
    expect(screen.getByText("button")).toBeInTheDocument();
  });
});
