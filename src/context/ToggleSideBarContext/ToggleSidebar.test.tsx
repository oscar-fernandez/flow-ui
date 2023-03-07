import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import ToggleProvider, { useToggle } from "./ToggleSideBarContext";

describe("Sidebar context tests", () => {
  it("Render provider", () => {
    render(
      <ToggleProvider>
        <div></div>
      </ToggleProvider>
    );
  });
});
