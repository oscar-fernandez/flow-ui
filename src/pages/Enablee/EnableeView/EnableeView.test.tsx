import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import EnableeView from "./EnableeView";

describe("Enablee View page", () => {
  it("should display enablee view page with correct components", () => {
    render(<EnableeView />);
  });
});
