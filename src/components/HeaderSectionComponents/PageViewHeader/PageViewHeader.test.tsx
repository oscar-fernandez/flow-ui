import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PageViewHeader } from "./PageViewHeader";
import { MemoryRouter } from "react-router";

describe("PageViewHeader Component", () => {
  it("should render without optional props", () => {
    render(
      <MemoryRouter>
        <PageViewHeader
          pageTitle="Test Page"
          showPlus={false}
          isHeader={false}
          plusClicked={false}
        />
      </MemoryRouter>
    );
    expect(screen.queryByTestId("plus")).not.toBeInTheDocument();
  });

  it("should render with optional props", () => {
    render(
      <PageViewHeader
        pageTitle="Test Page"
        showPlus={false}
        isHeader={false}
        plusClicked={false}
        showIcon={true}
        infoString="Test string"
      />
    );
    expect(screen.queryByTestId("plus")).not.toBeInTheDocument();
    expect(screen.getByTestId("info")).toBeInTheDocument();
  });

  it("should render plus button and info icon", () => {
    render(
      <PageViewHeader
        pageTitle="Test Page"
        showPlus={true}
        isHeader={false}
        plusClicked={false}
        showIcon={true}
        infoString="Test string"
      />
    );
    expect(screen.getByTestId("info")).toBeInTheDocument();
    expect(screen.getByTestId("plus")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("plus"));
  });

  it("should render plus button", () => {
    render(
      <PageViewHeader
        pageTitle="Test Page"
        showPlus={true}
        isHeader={false}
        plusClicked={false}
      />
    );
    fireEvent.click(screen.getByTestId("plus"));
  });
});
