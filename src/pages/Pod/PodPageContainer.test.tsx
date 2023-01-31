import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { getPendingPods } from "../../services/PodAPI";
import PodPageContainer from "./PodPageContainer";
import { mockFePod } from "../../data/MockFEPod";
import {
  useActivePods,
  useAvailablePods,
  useCompletedPods,
} from "./Hooks/customHook";
import {
  convertToStringArr,
  getActivePendingPodTag,
  getAvailablePodTag,
} from "../../utils/utilityFunctions";
import IFEPod from "../../models/interfaces/IFEPod";

vi.mock("./Hooks/customHook");
vi.mock("../../utils/utilityFunctions");

const mockUseAvailablePods = useAvailablePods as jest.MockedFunction<
  typeof useAvailablePods
>;

const mockGetAvailablePodTags = getAvailablePodTag as jest.MockedFunction<
  typeof getAvailablePodTag
>;
const mockUseActivePods = useActivePods as jest.MockedFunction<
  typeof useActivePods
>;

const mockGetActivePendingPodTag =
  getActivePendingPodTag as jest.MockedFunction<typeof getActivePendingPodTag>;

const mockConvertToStringArr = convertToStringArr as jest.MockedFunction<
  typeof convertToStringArr
>;
const techList = ["Java", ".Net", "React", "JavaScript"];

describe("Testing pod page container", () => {
  // it("display the pod header", () => {
  //   const mockHook = {
  //     podList: mockFePod,
  //     setPodList: () => {
  //       return null;
  //     },
  //   };
  //   mockUseAvailablePods.mockReturnValue(mockHook);
  //   mockGetActivePendingPodTag.mockReturnValue({
  //     name: "Active",
  //     color: "#E63946",
  //   });
  //   mockConvertToStringArr.mockReturnValue(techList);

  //   render(
  //     <PodPageContainer
  //       hook={mockUseAvailablePods}
  //       displayPageCarousel={false}
  //       displayTag={mockGetActivePendingPodTag}
  //     />
  //   );

  //   const headerElm = screen.getByTestId("pageHeaderTitleId");
  //   expect(headerElm).toBeInTheDocument();
  // });

  it("display alert component", () => {
    const mockHook = {
      podList: [],
      setPodList: () => {
        return null;
      },
    };
    mockUseAvailablePods.mockReturnValue(mockHook);
    mockGetActivePendingPodTag.mockReturnValue({
      name: "Active",
      color: "#E63946",
    });
    mockConvertToStringArr.mockReturnValue(techList);

    render(
      <PodPageContainer
        hook={mockUseAvailablePods}
        displayPageCarousel={false}
        displayTag={mockGetActivePendingPodTag}
        podType={"Available"}
      />
    );

    const alertElm = screen.getByText("No Available Pods");
    expect(alertElm).toBeInTheDocument();
  });

  it("display available pod to check if active tag is been display", () => {
    const mockHook = {
      podList: mockFePod,
      setPodList: () => {
        return null;
      },
    };
    mockUseAvailablePods.mockReturnValue(mockHook);
    mockGetActivePendingPodTag.mockReturnValue({
      name: "Active",
      color: "#E63946",
    });
    mockConvertToStringArr.mockReturnValue(techList);

    render(
      <PodPageContainer
        hook={mockUseAvailablePods}
        displayPageCarousel={false}
        displayTag={mockGetActivePendingPodTag}
        podType={"Available"}
      />
    );

    expect(screen.queryByText(mockFePod[0].podName)).toHaveTextContent(
      mockFePod[0].podName
    );
    const podRowElm = screen.getByTestId("pageSectionTestId");

    expect(podRowElm?.textContent).toContain("Active");
  });

  it("display active pod to check if active tag is been display", () => {
    const mockHook = {
      podList: mockFePod,
      setPodList: () => {
        return null;
      },
    };
    mockUseActivePods.mockReturnValue(mockHook);
    mockGetAvailablePodTags.mockReturnValue({
      name: "Available",
      color: "#E63946",
    });
    mockConvertToStringArr.mockReturnValue(techList);

    render(
      <PodPageContainer
        hook={mockUseActivePods}
        displayPageCarousel={false}
        displayTag={mockGetAvailablePodTags}
        podType={"Active"}
      />
    );

    expect(screen.queryByText(mockFePod[0].podName)).toHaveTextContent(
      mockFePod[0].podName
    );
    const podRowElm = screen.getByTestId("pageSectionTestId");

    expect(podRowElm?.textContent).toContain("Available");
  });
});
