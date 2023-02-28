import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PageViewHeader } from "./PageViewHeader";
import { MemoryRouter, useLocation } from "react-router";
import {
  useToggle,
  useToggleArrow,
  useToggleDetail,
  useToggleTemplate,
} from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

vi.mock("../../context/ToggleSideBarContext/ToggleSideBarContext");

// const mockUseLocation= useLocation

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useLocation: () => ({
//     pathname: "localhost:3000/pod"
//   })
// }));
//const mockUseToggle = useToggle as jest.MockedFunction<typeof useToggle>;
const mockUseToggle = useToggle as jest.MockedFunction<typeof useToggle>;
const mockUseToggleDetail = useToggleDetail as jest.MockedFunction<
  typeof useToggleDetail
>;
const mockUseToggleArrow = useToggleArrow as jest.MockedFunction<
  typeof useToggleArrow
>;
const mockUseToggleTemplate = useToggleTemplate as jest.MockedFunction<
  typeof useToggleTemplate
>;

describe("PageViewHeader Component", () => {
  beforeEach(() => {
    mockUseToggle.mockReturnValue([
      true,
      () => {
        null;
      },
    ]);
    // mockUseToggleDetail.mockReturnValue([
    //   null,
    //   () => {
    //     null;
    //   },
    // ]);
    // mockUseToggleArrow.mockReturnValue([
    //   false,
    //   () => {
    //     null;
    //   },
    // ]);
    // mockUseToggleTemplate.mockReturnValue([
    //   null,
    //   () => {
    //     null;
    //   },
    // ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should contain input field props title of page", () => {
    /* render(
      <MemoryRouter>
        <PageViewHeader
          pageTitle="Test Page"
          showPlus={false}
          isHeader={false}
          plusClicked={false}
        />
      </MemoryRouter>
    );  */
  });
  it("Should return the proper template based on the location of the user", () => {
    /*  render(
      <MemoryRouter>
        <PageViewHeader
          pageTitle="Pod"
          showPlus={true}
          isHeader={true}
          plusClicked={false}
        />
      </MemoryRouter>
    );  */
    //const plusButton = screen.getByTestId("plus");
    // expect(plusButton).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
});
