import { render } from "@testing-library/react";
import { describe, vi, it, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";
import EnablerTemplate from "./EnablerTemplate";
import {
  useToggleDetail,
  useToggle,
  useMapDetail,
  useToggleTemplate,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import { createEnabler } from "../../utils/utilityFunctions.test";
import { getActivePods, getPendingPods } from "../../services/PodAPI";
import { mockFePod } from "../../data/MockFEPod";

vi.mock("../../context/ToggleSideBarContext/ToggleSideBarContext.tsx");
vi.mock("../../services/PodAPI");

const mockUseToggleDetail = useToggleDetail as jest.MockedFunction<
  typeof useToggleDetail
>;
const mockUseMapDetail = useMapDetail as jest.MockedFunction<
  typeof useMapDetail
>;
const mockUseToggle = useToggle as jest.MockedFunction<typeof useToggle>;
const mockUseToggleTemplate = useToggleTemplate as jest.MockedFunction<
  typeof useToggleTemplate
>;
const mockGetActivePods = getActivePods as jest.MockedFunction<
  typeof getActivePods
>;

const mockGetPendingPods = getPendingPods as jest.MockedFunction<
  typeof getPendingPods
>;

const axiosres = {
  data: mockFePod,
};
const map = new Map();
map.set("Active", (mockGetActivePods as jest.Mock).mockResolvedValue(axiosres));
map.set(
  "Pending",
  (mockGetPendingPods as jest.Mock).mockResolvedValue(axiosres)
);

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
  });

  it("Should render the enabler templatee when details is to null", () => {
    render(
      <MemoryRouter initialEntries={["/enabler"]}>
        <EnablerTemplate />
      </MemoryRouter>
    );
    expect("John").toBeInTheDocument();
  });
});
