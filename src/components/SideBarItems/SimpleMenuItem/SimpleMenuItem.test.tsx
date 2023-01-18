import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import SimpleMenuItem from "./SimpleMenuItem";

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
}));

describe("Rendering", () => {
  it("should render SimpleMenuItem with specified name", () => {
    const menuItemName = "Management";
    const routePath = "/management";
    render(
      <SimpleMenuItem menuItemName={menuItemName} routePath={routePath} />
    );
    expect(screen.getByText(menuItemName)).toBeInTheDocument();
  });
});
