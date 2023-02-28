import { expect, describe, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PageViewHeader } from "./PageViewHeader";
import { MemoryRouter } from "react-router";

function wrapMemoryRouter(props: any) {
  return (
    <MemoryRouter>
      <PageViewHeader {...props} />
    </MemoryRouter>
  );
}

describe("PageViewHeader Component", () => {
  it("should render without optional props", () => {
    render(
      wrapMemoryRouter({
        pageTitle: "Test Page",
        showPlus: false,
        isHeader: false,
        plusClicked: false,
      })
    );
    expect(screen.queryByTestId("plus")).not.toBeInTheDocument();
  });

  it("should render with optional props", () => {
    render(
      wrapMemoryRouter({
        pageTitle: "Test Page",
        showPlus: false,
        isHeader: false,
        plusClicked: false,
        showIcon: true,
        infoString: "Test string",
      })
    );
    expect(screen.queryByTestId("plus")).not.toBeInTheDocument();
    expect(screen.getByTestId("info")).toBeInTheDocument();
  });

  it("should render plus button and info icon", () => {
    render(
      wrapMemoryRouter({
        pageTitle: "Test Page",
        showPlus: true,
        isHeader: false,
        plusClicked: false,
        showIcon: true,
        infoString: "Test string",
      })
    );
    expect(screen.getByTestId("info")).toBeInTheDocument();
    expect(screen.getByTestId("plus")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("plus"));
  });

  it("should render plus button", () => {
    render(
      wrapMemoryRouter({
        pageTitle: "Test Page",
        showPlus: true,
        isHeader: false,
        plusClicked: false,
      })
    );
    fireEvent.click(screen.getByTestId("plus"));
  });
});
