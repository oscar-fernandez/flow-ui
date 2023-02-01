import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PodPageContainer from "./PodPageContainer";
import { mockFePod } from "../../data/MockFEPod";
import {
  useActivePods,
  useAvailablePods,
  useCompletedPods,
} from "./Hooks/customHook";
import {
  convertToStringArr,
  generatePodTags,
  getAvailablePodTag,
} from "../../utils/utilityFunctions";
import PageRoutes from "../PageRoutes/PageRoutes";
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import App from "../App/App";

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

const mockGetActivePendingPodTag = generatePodTags as jest.MockedFunction<
  typeof generatePodTags
>;

const mockConvertToStringArr = convertToStringArr as jest.MockedFunction<
  typeof convertToStringArr
>;

// const mockConvertLocationToString = convertLocationToString as jest.MockedFunction<typeof convertLocationToString>;

// const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;

const techList = ["Java", ".Net", "React", "JavaScript"];

describe("Testing pod page container", async () => {
  it("display alert component", async () => {
    // const locationMock = {
    //   hash: "",
    //   key: "ju2w1j46",
    //   pathname: "/pod/active",
    //   search: "",
    //   state: null,
    // };
    // mockUseLocation.mockReturnValue(locationMock);
    // mockUseAvailablePods.mockReturnValue([]);
    mockUseActivePods.mockReturnValue([]);
    // mockGetActivePendingPodTag.mockReturnValue({
    //   name: "Active",
    //   color: "#E63946",
    // });
    mockConvertToStringArr.mockReturnValue(techList);
    // mockConvertLocationToString.mockReturnValue("Active");
    // mockUseLocation.mockReturnValue(locationMock);
    render(
      <MemoryRouter initialEntries={["/pod/active"]}>
        <PodPageContainer
          displayTag={mockGetActivePendingPodTag}
          hook={mockUseActivePods}
        />
      </MemoryRouter>
    );
    const alert = screen.getByTestId("alert-container");
    expect(alert).toBeInTheDocument();
  });

  it("does not display alert component when pod list is not empty", async () => {
    mockUseActivePods.mockReturnValue(mockFePod);
    mockGetActivePendingPodTag.mockReturnValue({
      name: "Active",
      color: "#E63946",
    });
    mockConvertToStringArr.mockReturnValue(techList);
    render(
      <MemoryRouter initialEntries={["/pod/active"]}>
        <PodPageContainer
          displayTag={mockGetActivePendingPodTag}
          hook={mockUseActivePods}
        />
      </MemoryRouter>
    );
    const alert = screen.queryByTestId("alert-container");
    expect(alert).not.toBeInTheDocument();
  });

  // it('display available pod to check if active tag is been display', () => {
  //   const mockHook = {
  //     podList: mockFePod,
  //     setPodList: () => {
  //       return null;
  //     },
  //   };
  //   mockUseAvailablePods.mockReturnValue(mockHook);
  //   mockGetActivePendingPodTag.mockReturnValue({
  //     name: 'Active',
  //     color: '#E63946',
  //   });
  //   mockConvertToStringArr.mockReturnValue(techList);

  //   render(
  //     <PodPageContainer
  //       hook={mockUseAvailablePods}
  //       displayPageCarousel={false}
  //       displayTag={mockGetActivePendingPodTag}
  //       podType={'Available'}
  //     />
  //   );

  //   expect(screen.queryByText(mockFePod[0].podName)).toHaveTextContent(
  //     mockFePod[0].podName
  //   );
  //   const podRowElm = screen.getByTestId('pageSectionTestId');

  //   expect(podRowElm?.textContent).toContain('Active');
  // });

  // it('display active pod to check if active tag is been display', () => {
  //   const mockHook = {
  //     podList: mockFePod,
  //     setPodList: () => {
  //       return null;
  //     },
  //   };
  //   mockUseActivePods.mockReturnValue(mockHook);
  //   mockGetAvailablePodTags.mockReturnValue({
  //     name: 'Available',
  //     color: '#E63946',
  //   });
  //   mockConvertToStringArr.mockReturnValue(techList);

  //   render(
  //     <PodPageContainer
  //       hook={mockUseActivePods}
  //       displayPageCarousel={false}
  //       displayTag={mockGetAvailablePodTags}
  //       podType={'Active'}
  //     />
  //   );

  //   expect(screen.queryByText(mockFePod[0].podName)).toHaveTextContent(
  //     mockFePod[0].podName
  //   );
  //   const podRowElm = screen.getByTestId('pageSectionTestId');

  //   expect(podRowElm?.textContent).toContain('Available');
  // });
});
