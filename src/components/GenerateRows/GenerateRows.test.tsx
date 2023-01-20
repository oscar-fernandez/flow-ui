import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { GenerateRows } from "./GenerateRows";

describe("Generate Rows component", () => {
  it("Should generate a list of row components", () => {
    render(<GenerateRows pageNum={0} />);
  });
});
