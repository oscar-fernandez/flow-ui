import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { Filter } from "./Filter";

describe("Filter", () => {
  it("should contain input field props for placeholder text", () => {
    render(
      <Filter
        inputOne="one"
        inputTwo="two"
        inputThree="three"
        inputFour="four"
      />
    );
  });
});
