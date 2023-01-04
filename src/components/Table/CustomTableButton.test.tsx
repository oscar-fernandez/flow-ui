import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CustomTableButton from "./CustomTableButton";

describe("Custom Button Test", () => {
  it("should update value based on tab", () => {
    render(<CustomTableButton value={"Technology"} buttonStyle={{}} />);
    const button = screen.getByTestId("button") as HTMLButtonElement;
    expect(button.value).toBe("");
  });
});
