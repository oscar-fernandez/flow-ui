import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import PodTemplate from "./PodTemplate";
import {
  useToggleDetail,
  useToggleArrow,
  useToggle,
  useToggleTemplate,
  useTogglePrevDetails,
  ToggleContext,
  ToggleArrowContext,
  ToggleDetailsContext,
  ToggleTemplateContext,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import { MemoryRouter } from "react-router";
import { createPod, updatePod } from "../../services/PodAPI";
import { getProjects } from "../../services/ManagementAPI";
import { GetEnableesPendingPodAssignment } from "../../services/EnableeAPI";
import { mockFePod } from "../../data/MockFEPod";
import { mockProjects } from "../../data/MockProjects";
import EnablerTemplate from "../EnablerTemplate/EnablerTemplate";
import { mockIFEnabler } from "../../data/MockIFEnabler";
import ToggleSideBar from "../ToggleSideBar/ToggleSidebar";

vi.mock("../../context/ToggleSideBarContext/ToggleSideBarContext");
vi.mock("../../services/PodAPI");
vi.mock("../../services/ManagementAPI");
vi.mock("../../services/EnableeAPI");

const mockUseToggle = useToggle as jest.MockedFunction<typeof useToggle>;
const mockUseToggleDetail = useToggleDetail as jest.MockedFunction<
  typeof useToggleDetail
>;
const mockUseToggleArrow = useToggleArrow as jest.MockedFunction<
  typeof useToggleArrow
>;

const mockGetEnablees = GetEnableesPendingPodAssignment as jest.MockedFunction<
  typeof GetEnableesPendingPodAssignment
>;

const mockGetProjects = getProjects as jest.MockedFunction<typeof getProjects>;

const mockCreatePod = createPod as jest.MockedFunction<typeof createPod>;

const mockUpdatePod = updatePod as jest.MockedFunction<typeof updatePod>;

const mockUseToggleTemplate = useToggleTemplate as jest.MockedFunction<
  typeof useToggleTemplate
>;
const mockUseTogglePrevDetails = useTogglePrevDetails as jest.MockedFunction<
  typeof useTogglePrevDetails
>;

const axiosres = {
  data: mockFePod[0],
};

describe("PodTemplate tests", () => {
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
    mockUseToggleArrow.mockReturnValue([
      false,
      () => {
        null;
      },
    ]);
    mockUseToggleTemplate.mockReturnValue([
      null,
      () => {
        return;
      },
    ]);

    mockUseTogglePrevDetails.mockReturnValue([
      [],
      () => {
        return;
      },
    ]);

    (mockGetProjects as jest.Mock).mockResolvedValue({
      data: mockProjects,
    });

    (mockGetEnablees as jest.Mock).mockResolvedValue({
      data: [],
    });

    (mockCreatePod as jest.Mock).mockResolvedValue(axiosres);

    (mockUpdatePod as jest.Mock).mockResolvedValue(axiosres);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render pod template and submit button should be disabled", async () => {
    render(
      <MemoryRouter>
        <PodTemplate />
      </MemoryRouter>
    );

    const podNameInput = screen.getByTestId("podName");
    fireEvent.change(podNameInput, { target: { value: "test" } });
    await waitFor(() => expect(podNameInput).toHaveValue("test"));
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeDisabled();
  });
  it("should render enabler template when clicked on the enabler name", async () => {
    mockUseToggleDetail.mockReturnValue([
      mockFePod[0],
      () => {
        null;
      },
    ]);
    const podTemp: React.ReactNode = <PodTemplate />;
    render(
      <MemoryRouter>
        <ToggleContext.Provider value={[true, () => false]}>
          {" "}
          <ToggleArrowContext.Provider value={[false, () => false]}>
            {" "}
            <ToggleTemplateContext.Provider
              value={[podTemp, () => mockUseToggleTemplate]}
            >
              <ToggleDetailsContext.Provider
                value={[mockFePod[0], () => mockUseToggleDetail]}
              >
                <ToggleSideBar template={<PodTemplate />} />
              </ToggleDetailsContext.Provider>
            </ToggleTemplateContext.Provider>
          </ToggleArrowContext.Provider>
        </ToggleContext.Provider>
      </MemoryRouter>
    );
    const enablerName = screen.getByTestId("John");
    fireEvent.click(enablerName);
    const enablerTemplate: React.ReactNode = <EnablerTemplate />;
    mockUseToggleTemplate.mockReturnValue([
      enablerTemplate,
      () => {
        return;
      },
    ]);
    mockUseToggleDetail.mockReturnValue([
      mockIFEnabler[0],
      () => {
        null;
      },
    ]);
    await waitFor(() => {
      expect(screen.getByTestId("John")).toBeInTheDocument();
    });
  });
  it("should enable submit button when all inputs are updated and call createPod when submit clicked", async () => {
    render(
      <MemoryRouter>
        <PodTemplate />
      </MemoryRouter>
    );
    const podNameInput = screen.getByTestId("podName");
    fireEvent.change(podNameInput, { target: { value: "test" } });
    const startDate = screen.getByPlaceholderText("No Start Date Selected");
    fireEvent.change(startDate, { target: { value: "February 9, 2024 -" } }); //must improve
    const endDate = screen.getByPlaceholderText("No End Date Selected");
    fireEvent.change(endDate, { target: { value: "February 26, 2024" } }); //must improve
    fireEvent.click(screen.getByTestId("projectsBtn"));
    const project = await screen.findByText("Flow");
    fireEvent.click(project);
    await waitFor(() =>
      expect(screen.getByTestId("projectsBtn")).toHaveTextContent("Flow")
    );
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Submit" })).toBeEnabled()
    );
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(mockCreatePod).toHaveBeenCalledOnce();
  });

  it("should render a prefilled template and call createPod when clicked", async () => {
    mockUseToggleDetail.mockReturnValue([
      mockFePod[0],
      () => {
        null;
      },
    ]);
    (mockGetProjects as jest.Mock).mockResolvedValue({
      data: mockProjects,
    });
    render(
      <MemoryRouter>
        <PodTemplate />
      </MemoryRouter>
    );
    const podNameInput = screen.getByTestId("podName");
    expect(podNameInput).toHaveValue("Crew");
    fireEvent.click(screen.getByTestId("projectsBtn"));
    const project = await screen.findByText("Flow");
    fireEvent.click(project);
    await waitFor(() =>
      expect(screen.getByTestId("projectsBtn")).toHaveTextContent("Flow")
    );
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(mockUpdatePod).toHaveBeenCalledOnce();
  });

  it("increase and decrease the pod enablee count when clicking on enablee checkboxes", async () => {
    const pod = mockFePod[0];
    const e1 = pod.enablee[0];
    const e2 = pod.enablee[1];

    e1.enablementStartDate = pod.podStartDate;
    e1.enablementEndDate = pod.podEndDate;

    e2.enablementStartDate = pod.podStartDate;
    e2.enablementEndDate = pod.podEndDate;

    pod.enablee = [e1, e2];

    mockUseToggleDetail.mockReturnValue([
      pod,
      () => {
        null;
      },
    ]);
    (mockGetProjects as jest.Mock).mockResolvedValue({
      data: mockProjects,
    });
    render(
      <MemoryRouter>
        <PodTemplate />
      </MemoryRouter>
    );
    const counter = screen.getByText("0 / 15");
    const boxList = await screen.findAllByTestId("enableeCheckbox");
    await waitFor(() => expect(boxList[0]).toBeChecked());
    expect(counter).toHaveTextContent("2 / 15");
    fireEvent.click(boxList[0]);
    await waitFor(() => expect(counter).toHaveTextContent("1 / 15"));
  });
});
