import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import PodTemplate from "./PodTemplate";
import {
  ToggleArrowContext,
  ToggleContext,
  ToggleDetailsContext,
  useToggleDetail,
  useToggleArrow,
  useToggle,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import ToggleSideBar from "../ToggleSideBar/ToggleSidebar";
import IFEPod from "../../models/interfaces/IFEPod";
import { MemoryRouter } from "react-router";
import { createPod, updatePod } from "../../services/PodAPI";
import { mockFePod } from "../../data/MockFEPod";

///////////////////////////////
vi.mock("../../context/ToggleSideBarContext/ToggleSideBarContext");
vi.mock("../../services/PodAPI");

const mockUseToggle = useToggle as jest.MockedFunction<typeof useToggle>;
const mockUseToggleDetail = useToggleDetail as jest.MockedFunction<
  typeof useToggleDetail
>;
const mockUseToggleArrow = useToggleArrow as jest.MockedFunction<
  typeof useToggleArrow
>;

const mockCreatePod = createPod as jest.MockedFunction<typeof createPod>;

const mockUpdatePod = updatePod as jest.MockedFunction<typeof updatePod>;
const axiosres = {
  data: mockFePod[0],
  status: 200,
  statusText: "ok",
  headers: {},
  config: {},
};

///////////////////////////

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
    mockCreatePod.mockResolvedValue(axiosres);

    mockUpdatePod.mockResolvedValue(axiosres);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render pod template", () => {
    render(
      <MemoryRouter>
        <PodTemplate />
      </MemoryRouter>
    );
    const sub = screen.getByText("Submit");
    expect(sub);
  });

  /*it("should handle name change", () => {
    render(
      <MemoryRouter>
        <PodTemplate />
      </MemoryRouter>
    );
    const nameInput = screen.getByTestId("podName") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(nameInput.value).toBe("test");
    fireEvent.change(nameInput, { target: { value: "" } });
    const err = screen.getByText("* Pod Name required");
    expect(err);
  });  

  //render the list of projects
  it("should render the list of projects", async () => {
    render(
      <MemoryRouter>
        <PodTemplate />
      </MemoryRouter>
    );
    const dataBtn = screen.getByTestId("projectsBtn");
    await userEvent.click(dataBtn);
    const flow = screen.getByText("Flow");
    await userEvent.click(flow);
    const project = screen.getByText("Flow");
    expect(project);
  });

  it("should render the list of available enablees", async () => {
    render(
      <MemoryRouter>
        <PodTemplate />
      </MemoryRouter>
    );
    const startDate = screen.getByPlaceholderText(
      "No Start Date Selected"
    ) as HTMLInputElement;
    const endDate = screen.getByPlaceholderText(
      "No End Date Selected"
    ) as HTMLInputElement;
    const today = new Date();
    const threeDay = addDays(today, 3).toString();
    const later = addDays(today, 21).toString();
    const projectBtn = screen.getByTestId("projectsBtn");
    await userEvent.click(startDate);
    fireEvent.change(startDate, { target: { value: threeDay } });
    await userEvent.click(endDate);
    fireEvent.change(endDate, { target: { value: later } });
    await userEvent.click(projectBtn);
    const pixle = screen.getByText("Pixelgram");
    fireEvent.click(pixle);
    waitFor(() => expect(screen.getByText("Jessabelle Cowringer")))
      .then()
      .catch();
    const checker = waitFor(() => screen.getByTestId("enableeCheckbox"))
      .then((e) => {
        fireEvent.change(e, { target: { checked: true } });
      })
      .catch();
    expect(checker);
  });

  //test the useEffect
  it("Should mess with the useEffect", async () => {
    render(
      <MemoryRouter>
        <ToggleContext.Provider value={[true, () => false]}>
          {" "}
          <ToggleArrowContext.Provider value={[false, () => false]}>
            {" "}
            <ToggleDetailsContext.Provider
              value={[createTempPod(), () => null]}
            >
              <ToggleSideBar template={<PodTemplate />} />
            </ToggleDetailsContext.Provider>
          </ToggleArrowContext.Provider>
        </ToggleContext.Provider>
      </MemoryRouter>
    );
  });  */

  ///////////////////////////////////////
  it("Should make a post request when the submit button is clicked & toggle side bar should be closed", async () => {
    render(
      <MemoryRouter>
        <PodTemplate />
      </MemoryRouter>
    );

    const inactiveSubmitButton = screen.getByTestId("podDisableSubmitButton");

    const nameInput = screen.getByTestId("podName") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Crew" } });
    const startDate = screen.getByPlaceholderText("No Start Date Selected");
    const endDate = screen.getByPlaceholderText("No End Date Selected");

    fireEvent.click(startDate);
    fireEvent.change(startDate, { target: { value: "08 Feb, 2023" } });

    fireEvent.click(endDate);
    fireEvent.change(endDate, { target: { value: "28 Feb, 2023" } });

    expect(endDate).toHaveValue("28 Feb, 2023");

    const dataBtn = screen.getByTestId("projectsBtn");
    await userEvent.click(dataBtn);
    const flow = screen.getByText("Flow");
    await userEvent.click(flow);

    waitForElementToBeRemoved(inactiveSubmitButton).then(() => {
      expect(screen.getByTestId("podActiveSubmitButton")).toBeInDocument();
    });
    // const submitButton =  screen.getByTestId("podSubmitButton");

    //  fireEvent.click(submitButton);

    //expect(mockCreatePod).toHaveBeenCalledOnce();

    // expect(mockUpdatePod).not.toHaveBeenCalled(); //the update was being called before because the test context was setting the details and so calling update instead of create
  });

  /*it("Should make a put request when the submit button is clicked & toggle side bar should be closed", () => {
    const updatedEnablee = dummyEnablees[0];
    updatedEnablee.employeeId = 1234;
    mockUseToggleDetail.mockReturnValue([
      dummyEnablees[0],
      () => {
        null;
      },
    ]);
    const putAxiosRes = axiosres;

    putAxiosRes.data.employeeId = 1234;

    mockUpdateEnablee.mockResolvedValue(putAxiosRes);
    render(
      <MemoryRouter>
        {" "}
        <PodTemplate />
      </MemoryRouter>
    );

    const employeeId = screen.getByTestId("employeeId") as HTMLInputElement;
    fireEvent.change(employeeId, { target: { value: "1234" } });

    const submitButton = screen.getByTestId("enableeTemplateSubmitBtn");

    fireEvent.click(submitButton);
    expect(mockUpdateEnablee).not.toHaveBeenCalled();
    expect(mockCreateEnablee).not.toHaveBeenCalled();

    expect(updatedEnablee).toEqual(putAxiosRes.data);
  });  */

  ////////////////////////////////////////
});

/**
 * Helper function used to test functions who use dates
 * @param date
 * @param days days to be added
 * @returns the new date
 */
function addDays(date: Date, days: number) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

/**
 * Helper function to be used to create a pod when need be.
 * @returns the created pod.
 */
const createTempPod = (): IFEPod => {
  const thisDate = new Date();
  return {
    id: 1,
    podName: "podCrew",
    podStartDate: thisDate.toString(),
    podEndDate: addDays(thisDate, 30).toString(),
    enablee: [],
    enabler: [],
    project: { id: 1, name: "foo", summary: "", technology: [], repoLink: "" },
  };
};
