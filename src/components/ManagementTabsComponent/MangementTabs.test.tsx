import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ManagementTabs from "./ManagementTabs";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("Dummy tests", () => {
  it("should be true", () => {
    expect(true).toBe(true);
  });
  it("should render ManagementTabs", () => {
    render(<ManagementTabs />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });
});
