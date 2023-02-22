import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EnableeTemplate from "./EnableeTemplate";
import { mockFePod } from "../../data/MockFEPod";
import { dummyEnablees } from "../../data/EnableeMock";

import ToggleProvider, {
  ToggleContext,
  useToggle,
  useToggleDetail,
  useToggleArrow,
  ToggleArrowContext,
  ToggleDetailsContext,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import ToggleSideBar from "../ToggleSideBar/ToggleSidebar";
import { CreateEnablee, UpdateEnablee } from "../../services/EnableeAPI";
import { MemoryRouter } from "react-router";
import { getAvailablePods } from "../../services/PodAPI";

vi.mock("../../context/ToggleSideBarContext/ToggleSideBarContext");
vi.mock("../../services/EnableeAPI");
vi.mock("../../services/PodAPI");

const mockUseToggle = useToggle as jest.MockedFunction<typeof useToggle>;
const mockUseToggleDetail = useToggleDetail as jest.MockedFunction<
  typeof useToggleDetail
>;
const mockUseToggleArrow = useToggleArrow as jest.MockedFunction<
  typeof useToggleArrow
>;

const mockCreateEnablee = CreateEnablee as jest.MockedFunction<
  typeof CreateEnablee
>;

const mockUpdateEnablee = UpdateEnablee as jest.MockedFunction<
  typeof UpdateEnablee
>;

const mockGetAvailablePods = getAvailablePods as jest.MockedFunction<
  typeof getAvailablePods
>;
//const handleSubmitSpy= vi.spyOn(EnableeTemplate.prototype ,'handleSubmit')

const axiosres = {
  data: dummyEnablees[0],
};

const axiosrespod = {
  data: mockFePod,
};

const t = Promise.resolve({ data: dummyEnablees[0] });

const today = new Date();
const later = addDays(today, 5).toString();

describe("EnableeTemplate tests", () => {
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
    (mockCreateEnablee as jest.Mock).mockResolvedValueOnce(axiosres);
    (mockGetAvailablePods as jest.Mock).mockResolvedValue(axiosrespod);
    (mockUpdateEnablee as jest.Mock).mockResolvedValue(axiosres);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render enablee template", () => {
    render(
      <MemoryRouter>
        {" "}
        <EnableeTemplate />
      </MemoryRouter>
    );
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("should handle name change", () => {
    render(
      <MemoryRouter>
        {" "}
        <EnableeTemplate />
      </MemoryRouter>
    );
    const nameInput = screen.getByTestId("enableeName") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(nameInput.value).toBe("test");
    fireEvent.change(nameInput, { target: { value: "" } });
    expect(screen.getByText("* Enablee Name required")).toBeInTheDocument();
  });

  it("should handle employee id change", () => {
    render(
      <MemoryRouter>
        {" "}
        <EnableeTemplate />
      </MemoryRouter>
    );
    const employeeId = screen.getByTestId("employeeId") as HTMLInputElement;
    fireEvent.change(employeeId, { target: { value: "test" } });
    expect(employeeId.value).toBe("test");
  });

  it("should handle assetTag change", () => {
    render(
      <MemoryRouter>
        {" "}
        <EnableeTemplate />
      </MemoryRouter>
    );
    const assetTag = screen.getByTestId("assetTag") as HTMLInputElement;
    fireEvent.change(assetTag, { target: { value: "test" } });
    expect(assetTag.value).toBe("test");
  });

  it("should handle country change", () => {
    render(
      <MemoryRouter>
        {" "}
        <EnableeTemplate />
      </MemoryRouter>
    );
    const country = screen.getByTestId("country") as HTMLInputElement;
    fireEvent.change(country, { target: { value: "test" } });
    expect(country.value).toBe("test");
  });

  it("should handle community change", () => {
    render(
      <MemoryRouter>
        {" "}
        <EnableeTemplate />
      </MemoryRouter>
    );
    const community = screen.getByTestId("community") as HTMLInputElement;
    fireEvent.change(community, { target: { value: "test" } });
    expect(community.value).toBe("test");
  });

  it("should handle employmentType change", () => {
    render(
      <MemoryRouter>
        {" "}
        <EnableeTemplate />
      </MemoryRouter>
    );
    const employmentType = screen.getByTestId(
      "employmentType"
    ) as HTMLInputElement;
    fireEvent.change(employmentType, { target: { value: "test" } });
    expect(employmentType.value).toBe("test");
  });

  it("should handle isEmployed toggle", () => {
    render(
      <MemoryRouter>
        {" "}
        <EnableeTemplate />
      </MemoryRouter>
    );
    const isEmployed = screen.getByTestId("isEmployed") as HTMLInputElement;
    expect(isEmployed).toBeChecked();
    fireEvent.click(isEmployed);
    expect(isEmployed).not.toBeChecked();
  });

  it("should handle grade change", () => {
    render(
      <MemoryRouter>
        {" "}
        <EnableeTemplate />
      </MemoryRouter>
    );
    const grade = screen.getByTestId("grade") as HTMLInputElement;
    fireEvent.change(grade, { target: { value: "test" } });
    expect(grade.value).toBe("test");
  });

  it("Should make a post request when the submit button is clicked & toggle side bar should be closed", () => {
    render(
      <MemoryRouter>
        {" "}
        <EnableeTemplate />
      </MemoryRouter>
    );
    const nameInput = screen.getByTestId("enableeName") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    const employeeId = screen.getByTestId("employeeId") as HTMLInputElement;
    fireEvent.change(employeeId, { target: { value: "1234" } });
    const startDate = screen.getByPlaceholderText("No Start Date Selected");
    const endDate = screen.getByPlaceholderText("No End Date Selected");

    fireEvent.click(startDate);
    fireEvent.change(startDate, { target: { value: today.toString() } });

    fireEvent.click(endDate);
    fireEvent.change(endDate, { target: { value: later } });

    const submitButton = screen.getByTestId("enableeTemplateSubmitBtn");

    fireEvent.click(submitButton);

    expect(mockCreateEnablee).toHaveBeenCalledOnce();

    expect(mockUpdateEnablee).not.toHaveBeenCalled(); //the update was being called before because the test context was setting the details and so calling update instead of create
  });

  it("Should make a put request when the submit button is clicked & toggle side bar should be closed", () => {
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

    (mockUpdateEnablee as jest.Mock).mockResolvedValue(putAxiosRes);
    render(
      <MemoryRouter>
        {" "}
        <EnableeTemplate />
      </MemoryRouter>
    );

    const employeeId = screen.getByTestId("employeeId") as HTMLInputElement;
    fireEvent.change(employeeId, { target: { value: "1234" } });

    const submitButton = screen.getByTestId("enableeTemplateSubmitBtn");

    fireEvent.click(submitButton);
    expect(mockUpdateEnablee).toHaveBeenCalled();
    expect(mockCreateEnablee).not.toHaveBeenCalled();

    expect(updatedEnablee).toEqual(putAxiosRes.data);
  });

  it("should disable submit button until all required fields are entered and handle checkbox clicking", async () => {
    render(
      <MemoryRouter>
        {" "}
        <EnableeTemplate />
      </MemoryRouter>
    );
    const nameInput = screen.getByTestId("enableeName") as HTMLInputElement;
    const employeeId = screen.getByTestId("employeeId") as HTMLInputElement;
    const startDate = screen.getByPlaceholderText("No Start Date Selected");
    const endDate = screen.getByPlaceholderText("No End Date Selected");
    expect(screen.getByText("Submit")).toBeDisabled();
    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(employeeId, { target: { value: "test" } });
    fireEvent.click(startDate);
    fireEvent.change(startDate, { target: { value: today.toString() } });
    fireEvent.click(endDate);
    fireEvent.change(endDate, { target: { value: later } });
    expect(screen.getByText("Submit")).toBeEnabled();
    //testing that checkbox is disabled and clicked twice
    let teamCheckBox: any;
    await waitFor(() => {
      teamCheckBox = screen.getByTestId(
        mockFePod[1].podName
      ) as HTMLInputElement;
    });
    fireEvent.click(teamCheckBox);
    expect(teamCheckBox).toBeInTheDocument();
    const gangCheckbox = screen.getByTestId(
      mockFePod[2].podName
    ) as HTMLInputElement;
    expect(gangCheckbox).toBeDisabled();
    fireEvent.click(teamCheckBox);
    expect(teamCheckBox).not.toBeChecked();
  });

  it("should handle enablee that is passed in from context", async () => {
    render(
      <MemoryRouter>
        <ToggleContext.Provider value={[true, () => false]}>
          {" "}
          <ToggleArrowContext.Provider value={[false, () => false]}>
            {" "}
            <ToggleDetailsContext.Provider value={[null, () => null]}>
              <ToggleSideBar template={<EnableeTemplate />} />
            </ToggleDetailsContext.Provider>
          </ToggleArrowContext.Provider>
        </ToggleContext.Provider>
      </MemoryRouter>
    );

    const nameInput = screen.getByTestId("enableeName") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    const employeeId = screen.getByTestId("employeeId") as HTMLInputElement;
    fireEvent.change(employeeId, { target: { value: "1234" } });
    const startDate = screen.getByPlaceholderText("No Start Date Selected");
    const endDate = screen.getByPlaceholderText("No End Date Selected");

    fireEvent.click(startDate);
    fireEvent.change(startDate, { target: { value: today.toString() } });

    fireEvent.click(endDate);
    fireEvent.change(endDate, { target: { value: later } });

    const submitButton = screen.getByTestId("enableeTemplateSubmitBtn");

    fireEvent.click(submitButton);

    expect(mockCreateEnablee).toHaveBeenCalledOnce();

    expect(mockUpdateEnablee).not.toHaveBeenCalled(); //the update was being called before because the test context was setting the details and so calling update instead of create
  });
});

function addDays(date: Date, days: number) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}
