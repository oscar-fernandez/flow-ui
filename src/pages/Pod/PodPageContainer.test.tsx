import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PodPageContainer from "./PodPageContainer";
import { mockFePod } from "../../data/MockFEPod";
import {
  useActivePods,
  useAvailablePods,
  usePendingStartPods,
  useCompletedPods,
} from "./Hooks/customHook";
import {
  convertToStringArr,
  generatePodTags,
  getAvailablePodTag,
} from "../../utils/utilityFunctions";
import { MemoryRouter } from "react-router-dom";
import IFEPod from "../../models/interfaces/IFEPod";

vi.mock("./Hooks/customHook");
vi.mock("../../utils/utilityFunctions");

const mockUseAvailablePods = useAvailablePods as jest.MockedFunction<
  typeof useAvailablePods
>;

const mockUseCompletedPods = useCompletedPods as jest.MockedFunction<
  typeof useCompletedPods
>;

const mockGetAvailablePodTags = getAvailablePodTag as jest.MockedFunction<
  typeof getAvailablePodTag
>;
const mockUsePendingStartPods = usePendingStartPods as jest.MockedFunction<
  typeof usePendingStartPods
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

const mockUpdatePodsFn = vi.fn((list: IFEPod[]) => []);

beforeEach(() => {
  vi.restoreAllMocks();
});

const techList = ["Java", ".Net", "React", "JavaScript"];

describe("Testing pod page container", async () => {
  it("display alert component", async () => {
    mockUseActivePods.mockReturnValue([[], mockUpdatePodsFn]);
    mockConvertToStringArr.mockReturnValue(techList);
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

  it("display alert component when wrong route is passed", async () => {
    mockUseActivePods.mockReturnValue([[], mockUpdatePodsFn]);
    mockConvertToStringArr.mockReturnValue(techList);
    render(
      <MemoryRouter initialEntries={[""]}>
        <PodPageContainer
          displayTag={mockGetActivePendingPodTag}
          hook={mockUseActivePods}
        />
      </MemoryRouter>
    );
    const alert = screen.getByTestId("alert-container");
    expect(alert).toBeInTheDocument();
  });

  it("display alert component when defailt route is passed", async () => {
    mockUseActivePods.mockReturnValue([[], mockUpdatePodsFn]);
    mockConvertToStringArr.mockReturnValue(techList);
    render(
      <MemoryRouter initialEntries={["/pod/"]}>
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
    mockUseActivePods.mockReturnValue([mockFePod, mockUpdatePodsFn]);
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

  it("display available pod to check if active tag is been display", () => {
    mockUseAvailablePods.mockReturnValue([mockFePod, mockUpdatePodsFn]);
    mockGetActivePendingPodTag.mockReturnValue({
      name: "Active",
      color: "#E63946",
    });
    mockConvertToStringArr.mockReturnValue(techList);

    render(
      <MemoryRouter initialEntries={["/pod/available"]}>
        <PodPageContainer
          hook={mockUseAvailablePods}
          displayTag={mockGetActivePendingPodTag}
        />
      </MemoryRouter>
    );

    expect(screen.queryByText(mockFePod[0].podName)).toHaveTextContent(
      mockFePod[0].podName
    );
    const podRowElm = screen.getByTestId("pageSectionTestId");
    expect(podRowElm?.textContent).toContain("Active");
  });

  it("display avtive pod to check if available tag is been display", () => {
    mockUseActivePods.mockReturnValue([mockFePod, mockUpdatePodsFn]);
    mockGetActivePendingPodTag.mockReturnValue({
      name: "Available",
      color: "#E63946",
    });
    mockConvertToStringArr.mockReturnValue(techList);

    render(
      <MemoryRouter initialEntries={["/pod/active"]}>
        <PodPageContainer
          hook={mockUseActivePods}
          displayTag={mockGetActivePendingPodTag}
        />
      </MemoryRouter>
    );

    expect(screen.queryByText(mockFePod[0].podName)).toHaveTextContent(
      mockFePod[0].podName
    );
    const podRowElm = screen.getByTestId("pageSectionTestId");
    expect(podRowElm?.textContent).toContain("Available");
  });

  it("display pending pod to check if available tag is been display", () => {
    mockUsePendingStartPods.mockReturnValue([mockFePod, mockUpdatePodsFn]);
    mockGetAvailablePodTags.mockReturnValue({
      name: "Available",
      color: "#E63946",
    });
    mockConvertToStringArr.mockReturnValue(techList);

    render(
      <MemoryRouter initialEntries={["/pod/pending"]}>
        <PodPageContainer
          hook={mockUsePendingStartPods}
          displayTag={mockGetAvailablePodTags}
        />
      </MemoryRouter>
    );

    expect(screen.queryByText(mockFePod[2].podName)).toHaveTextContent(
      mockFePod[2].podName
    );
    const podRowElm = screen.getByTestId("pageSectionTestId");
    expect(podRowElm?.textContent).toContain("Available");
  });

  it("display completed pod to check if no tag is been display", () => {
    mockUseCompletedPods.mockReturnValue([mockFePod, mockUpdatePodsFn]);
    mockGetAvailablePodTags.mockReturnValue({
      name: "",
      color: "#E63946",
    });
    mockConvertToStringArr.mockReturnValue(techList);

    render(
      <MemoryRouter initialEntries={["/pod/completed"]}>
        <PodPageContainer
          hook={mockUseCompletedPods}
          displayTag={mockGetActivePendingPodTag}
        />
      </MemoryRouter>
    );

    expect(screen.queryByText(mockFePod[2].podName)).toHaveTextContent(
      mockFePod[2].podName
    );
    const podRowElm = screen.getByTestId("pageSectionTestId");
    expect(podRowElm?.textContent).toContain("");
  });
});
