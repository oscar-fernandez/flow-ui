import { describe, it, vi, beforeEach, afterEach } from "vitest";
import { PageViewHeader } from "./PageViewHeader";
import { MemoryRouter } from "react-router";
import {
  useToggle,
  useToggleDetail,
  useToggleTemplate,
} from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import { render } from "@testing-library/react";

vi.mock("../../../context/ToggleSideBarContext/ToggleSideBarContext");

const mockUseToggle = useToggle as jest.MockedFunction<typeof useToggle>;
const mockUseToggleDetail = useToggleDetail as jest.MockedFunction<
  typeof useToggleDetail
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

  it("should contain input field props title of page", () => {
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
  });
});
