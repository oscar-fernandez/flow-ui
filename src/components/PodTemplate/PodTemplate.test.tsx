import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import PodTemplate from "./PodTemplate";
import {
  useToggleDetail,
  useToggleArrow,
  useToggle,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import { MemoryRouter } from "react-router";
import { createPod, updatePod } from "../../services/PodAPI";
import { getProjects } from "../../services/ManagementAPI";
import { GetEnableesPendingPodAssignment } from "../../services/EnableeAPI";
import { mockFePod } from "../../data/MockFEPod";
import { mockProjects } from "../../data/MockProjects";

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

  it("should enable submit button when all inputs are updated and call createPod when submit clicked", async () => {
    render(
      <MemoryRouter>
        <PodTemplate />
      </MemoryRouter>
    );
    const podNameInput = screen.getByTestId("podName");
    fireEvent.change(podNameInput, { target: { value: "test" } });
    const startDate = screen.getByPlaceholderText("No Start Date Selected");
    fireEvent.change(startDate, { target: { value: "February 25, 2023 -" } });
    const endDate = screen.getByPlaceholderText("No End Date Selected");
    fireEvent.change(endDate, { target: { value: "February 26, 2023" } });
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
    const counter = screen.getByText("0 / 15");
    const boxList = await screen.findAllByTestId("enableeCheckbox");
    await waitFor(() => expect(boxList[0]).toBeChecked());
    expect(counter).toHaveTextContent("5 / 15");
    fireEvent.click(boxList[0]);
    await waitFor(() => expect(counter).toHaveTextContent("4 / 15"));
  });
});
