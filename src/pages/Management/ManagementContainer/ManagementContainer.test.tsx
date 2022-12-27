import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import ManagementView from "./ManagementContainer";

describe("Management View page", () => {
  it("should display management view page with correct components", () => {
    render(<ManagementView />);
  });
});
