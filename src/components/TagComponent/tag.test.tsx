import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { TagComponent } from "./Tag";

describe("TagComponent", () => {
  it("should display tag component", () => {
    render(<TagComponent name="test" color="red" />);
  });
});
