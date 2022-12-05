import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { PendingEnablement } from "./PendingEnablementStart";

describe("PendingEnablement", () => {
  it("should display pending enablement start", () => {
    render(<PendingEnablement />);
  });
});
