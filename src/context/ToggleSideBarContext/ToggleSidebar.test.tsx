import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ToggleProvider from "./ToggleSideBarContext";

describe("Sidebar context tests", () => {
  it("Render provider", () => {
    render(
      <ToggleProvider>
        <div></div>
      </ToggleProvider>
    );
  });
});
