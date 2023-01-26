import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { getPendingPods } from "../../services/PodAPI";
import PodPageContainer from "./PodPageContainer";
import { mockFePod } from "../../data/MockFEPod";
import { useAvailablePods, useCompletedPods } from "./Hooks/customHook";
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
      />
    );

    expect(screen.queryByText(mockFePod[0].podName)).toHaveTextContent(
      mockFePod[0].podName
    );
    const podRowElm = screen.getByTestId("pageSectionTestId");

    expect(podRowElm?.textContent).toContain("Active");
  });
});
