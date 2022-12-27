import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ManagementTabs from "./ManagementTabs";
import { SyntheticEvent } from "react";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("ManagementTabs", () => {
  it("should render ManagementTabs", () => {
    render(
      <ManagementTabs
        handleChange={function (
          e: SyntheticEvent<Element, Event>,
          newValue: number
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });
});
