import { expect, describe, it, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PageViewHeader } from "./PageViewHeader";
import { MemoryRouter } from "react-router";
import {
  useToggle,
  useToggleDetail,
  useToggleTemplate,
} from "../../../context/ToggleSideBarContext/ToggleSideBarContext";

vi.mock("../../../context/ToggleSideBarContext/ToggleSideBarContext");

const mockUseToggle = useToggle as jest.MockedFunction<typeof useToggle>;
const mockUseToggleDetail = useToggleDetail as jest.MockedFunction<
  typeof useToggleDetail
>;

const mockUseToggleTemplate = useToggleTemplate as jest.MockedFunction<
  typeof useToggleTemplate
>;

function wrapMemoryRouter(props: any) {
  return (
    <MemoryRouter>
      <PageViewHeader {...props} />
    </MemoryRouter>
  );
}

describe("PageViewHeader Component", () => {
  beforeEach(() => {
    mockUseToggle.mockReturnValue([
      true,
      () => {
        null;
      },
    ]);
    mockUseToggleDetail.mockReturnValue([
      null,
      () => {
        null;
      },
    ]);

    mockUseToggleTemplate.mockReturnValue([
      null,
      () => {
        null;
      },
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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
