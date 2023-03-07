import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EnablerView from "./EnablerView";
import { getActivePods, getPendingPods } from "../../../services/PodAPI";
import { MemoryRouter } from "react-router";
import {
  useMapDetail,
  useToggle,
  useToggleArrow,
  useToggleDetail,
  useToggleSkills,
  useToggleTemplate,
} from "../../../context/ToggleSideBarContext/ToggleSideBarContext";
import { mockFePod } from "../../../data/MockFEPod";
import { getTechnologies } from "../../../services/ManagementAPI";
import { mockTechnology } from "../../../data/MockData";

describe("Enabler View Renders", () => {
  vi.mock("../../../context/ToggleSideBarContext/ToggleSideBarContext");
  vi.mock("../../../services/PodAPI");
  vi.mock("../../../services/ManagementAPI");

  const mockMapDetail = useMapDetail as jest.MockedFunction<
    typeof useMapDetail
  >;
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

  const mockGetActivePods = getActivePods as jest.MockedFunction<
    typeof getActivePods
  >;

  const mockGetPendingPods = getPendingPods as jest.MockedFunction<
    typeof getPendingPods
  >;

  const mockGetTechnologies = getTechnologies as jest.MockedFunction<
    typeof getTechnologies
  >;

  const mockToggleSkills = useToggleSkills as jest.MockedFunction<
    typeof useToggleSkills
  >;

  const axiosres = {
    data: mockFePod,
  };
  const otherRes = {
    data: mockTechnology,
  };
  const map = new Map();
  map.set(
    "Active",
    (mockGetActivePods as jest.Mock).mockResolvedValue(axiosres)
  );
  map.set(
    "Pending",
    (mockGetPendingPods as jest.Mock).mockResolvedValue(axiosres)
  );
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
  mockMapDetail.mockReturnValue([
    null,
    () => {
      map;
    },
  ]);
  mockUseToggleArrow.mockReturnValue([
    false,
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

  (mockGetTechnologies as jest.Mock).mockResolvedValue(otherRes);

  mockToggleSkills.mockReturnValue([
    [],
    () => {
      otherRes.data;
    },
  ]);

  it("should render and seed the map", () => {
    render(
      <MemoryRouter>
        <EnablerView />
      </MemoryRouter>
    );
    expect(mockMapDetail).toBeCalled();
    const text = screen.getByText("Enablers");
    expect(text).toBeInTheDocument();
  });
});
