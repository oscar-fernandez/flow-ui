import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CustomTableButton from "./CustomTableButton";

describe("Custom Button Test", () => {
  it("should update value based on tab", () => {
    const utils = render(
      <CustomTableButton value="Technology" buttonStyle={""} />
    );
    const button = utils.getByTestId("button") as HTMLButtonElement;
    expect(button.value).toBe("");
  });
});
