import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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

  it("should render Technology", () => {
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
    fireEvent.change(screen.getByTestId("projectTabs"), {
      currentTarget: {
        textContent: "Technology",
      },
    });
    fireEvent.click(screen.getByTestId("techTab"));
    expect(screen.getByTestId("techTab")).toHaveStyle(
      "backgroundColor: #EBEDEB"
    );
    fireEvent.click(screen.getByTestId("gradeTab"));
    expect(screen.getByTestId("gradeTab")).toHaveStyle(
      "backgroundColor: #EBEDEB"
    );
    fireEvent.click(screen.getByTestId("countryTab"));
    expect(screen.getByTestId("countryTab")).toHaveStyle(
      "backgroundColor: #EBEDEB"
    );
    fireEvent.click(screen.getByTestId("communityTab"));
    expect(screen.getByTestId("communityTab")).toHaveStyle(
      "backgroundColor: #EBEDEB"
    );
  });
});
