import { render, screen } from "@testing-library/react";
import { describe, vi, it, beforeEach, expect, afterEach } from "vitest";
import { MemoryRouter } from "react-router";
import EnablerTemplate from "./EnablerTemplate";
import {
  useToggleDetail,
  useToggle,
  useMapDetail,
  useToggleTemplate,
  useTogglePrevDetails,
  useToggleArrow,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import { createEnabler } from "../../utils/utilityFunctions.test";
import { mockFePod } from "../../data/MockFEPod";
vi.mock("../../context/ToggleSideBarContext/ToggleSideBarContext.tsx");
vi.mock("../../services/PodAPI");

const mockUseToggleDetail = useToggleDetail as jest.MockedFunction<
  typeof useToggleDetail
>;
const mockUseMapDetail = useMapDetail as jest.MockedFunction<
  typeof useMapDetail
>;
const mockUsePreToggleDetail = useTogglePrevDetails as jest.MockedFunction<
  typeof useTogglePrevDetails
>;
const mockUseToggleArrow = useToggleArrow as jest.MockedFunction<
  typeof useToggleArrow
>;
const mockUseToggle = useToggle as jest.MockedFunction<typeof useToggle>;
const mockUseToggleTemplate = useToggleTemplate as jest.MockedFunction<
  typeof useToggleTemplate
>;

mockFePod[0].id = 1;
const map = new Map();
map.set("Active", mockFePod);
map.set("Pending", mockFePod);

describe("Testing the Enabler Template to display ", () => {
  beforeEach(() => {
    mockUseToggleDetail.mockReturnValue([
      createEnabler(),
      () => {
        null;
      },
    ]);
    mockUseMapDetail.mockReturnValue([
      map,
      () => {
        null;
      },
    ]);
    mockUseToggle.mockReturnValue([
      true,
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
    mockUsePreToggleDetail.mockReturnValue([
      [],
      () => {
        return;
      },
    ]);
    mockUseToggleArrow.mockReturnValue([
      false,
      () => {
        return;
      },
    ]);
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Should render the enabler templatee when details is to an Enabler", () => {
    render(
      <MemoryRouter initialEntries={["/enabler"]}>
        <EnablerTemplate />
      </MemoryRouter>
    );
    const enablerName = screen.getByTestId("enableeName") as HTMLInputElement;

    expect(enablerName.value).toBe("John Travolta");
  });
  it("Should render the enabler templatee when details is to an null", () => {
    mockUseToggleDetail.mockReturnValue([
      null,
      () => {
        null;
      },
    ]);
    render(
      <MemoryRouter initialEntries={["/enabler"]}>
        <EnablerTemplate />
      </MemoryRouter>
    );
    const enablerName = screen.getByTestId("enableeName") as HTMLInputElement;

    expect(enablerName.value).toBe("");
  });
});
