import { describe, it, expect, vi, beforeEach } from "vitest";
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
import { CreateEnablee } from "../../services/EnableeAPI";
import { userEvent } from "@testing-library/user-event/dist/types/setup";
import { DatepickerComponent } from "../DatepickerComponent/DatePickerComponent";

vi.mock("../../context/ToggleSideBarContext/ToggleSideBarContext");
vi.mock("../../services/EnableeAPI");

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
//const handleSubmitSpy= vi.spyOn(EnableeTemplate.prototype ,'handleSubmit')

const axiosres = {
  data: dummyEnablees[0],
  status: 200,
  statusText: "ok",
  headers: {},
  config: {},
};

describe("EnableeTemplate tests", () => {
  beforeEach(() => {
    mockUseToggle.mockReturnValue([
      true,
      () => {
        null;
      },
    ]);

    mockUseToggleDetail.mockReturnValue([
      dummyEnablees[0],
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
    mockCreateEnablee.mockResolvedValue(axiosres);
  });

  it("should render enablee template", () => {
    render(<EnableeTemplate />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("should handle name change", () => {
    render(<EnableeTemplate />);
    const nameInput = screen.getByTestId("enableeName") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(nameInput.value).toBe("test");
    fireEvent.change(nameInput, { target: { value: "" } });
    expect(screen.getByText("* Enablee Name required")).toBeInTheDocument();
  });

  it("should handle employee id change", () => {
    render(<EnableeTemplate />);
    const employeeId = screen.getByTestId("employeeId") as HTMLInputElement;
    fireEvent.change(employeeId, { target: { value: "test" } });
    expect(employeeId.value).toBe("test");
  });

  it("should handle assetTag change", () => {
    render(<EnableeTemplate />);
    const assetTag = screen.getByTestId("assetTag") as HTMLInputElement;
    fireEvent.change(assetTag, { target: { value: "test" } });
    expect(assetTag.value).toBe("test");
  });

  it("should handle country change", () => {
    render(<EnableeTemplate />);
    const country = screen.getByTestId("country") as HTMLInputElement;
    fireEvent.change(country, { target: { value: "test" } });
    expect(country.value).toBe("test");
  });

  it("should handle community change", () => {
    render(<EnableeTemplate />);
    const community = screen.getByTestId("community") as HTMLInputElement;
    fireEvent.change(community, { target: { value: "test" } });
    expect(community.value).toBe("test");
  });

  it("should handle employmentType change", () => {
    render(<EnableeTemplate />);
    const employmentType = screen.getByTestId(
      "employmentType"
    ) as HTMLInputElement;
    fireEvent.change(employmentType, { target: { value: "test" } });
    expect(employmentType.value).toBe("test");
  });

  it("should handle isEmployed toggle", () => {
    render(<EnableeTemplate />);
    const isEmployed = screen.getByTestId("isEmployed") as HTMLInputElement;
    expect(isEmployed).toBeChecked();
    fireEvent.click(isEmployed);
    expect(isEmployed).not.toBeChecked();
  });

  it("should handle grade change", () => {
    render(<EnableeTemplate />);
    const grade = screen.getByTestId("grade") as HTMLInputElement;
    fireEvent.change(grade, { target: { value: "test" } });
    expect(grade.value).toBe("test");
  });

  it("Should make a post request when the submit button is clicked & toggle side bar should be closed", async () => {
    render(
      <ToggleContext.Provider value={[true, () => false]}>
        {" "}
        <ToggleArrowContext.Provider value={[false, () => false]}>
          {" "}
          <ToggleDetailsContext.Provider value={[dummyEnablees[0], () => null]}>
            <ToggleSideBar template={<EnableeTemplate />} />
          </ToggleDetailsContext.Provider>
        </ToggleArrowContext.Provider>
      </ToggleContext.Provider>
    );
    const nameInput = screen.getByTestId("enableeName") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "test" } });
    const employeeId = screen.getByTestId("employeeId") as HTMLInputElement;
    fireEvent.change(employeeId, { target: { value: "test" } });
    const startDate = screen.getByPlaceholderText("No Start Date Selected");
    const endDate = screen.getByPlaceholderText("No End Date Selected");

    fireEvent.click(startDate);
    fireEvent.change(startDate, { target: { value: "1 Feb, 2023" } });

    fireEvent.click(endDate);
    fireEvent.change(endDate, { target: { value: "5 Feb, 2023" } });
    await waitFor(() => {
      expect(startDate.innerHTML("February 1, 2023")).toBeInTheDocument();
    });
    const dateJoin = screen.getByTestId("dateJoin");
    expect(dateJoin.innerHTML).toBe("February 3, 2023");

    const submitButton = screen.getByTestId(
      "enableeTemplateSubmitBtn"
    ) as HTMLButtonElement;
    fireEvent.click(submitButton);
    // await waitFor( () => {expect(mockCreateEnablee).toHaveBeenCalledOnce()})
  });

  // it("should disable submit button until all required fields are entered and handle checkbox clicking", () => {
  //   render(<EnableeTemplate />);
  //   const nameInput = screen.getByTestId("enableeName") as HTMLInputElement;
  //   const employeeId = screen.getByTestId("employeeId") as HTMLInputElement;
  //   const startDate = screen.getByPlaceholderText("No Start Date Selected");
  //   const endDate = screen.getByPlaceholderText("No End Date Selected");
  //   expect(screen.getByText("Submit")).toBeDisabled();
  //   fireEvent.change(nameInput, { target: { value: "test" } });
  //   fireEvent.change(employeeId, { target: { value: "test" } });
  //   fireEvent.click(startDate);
  //   fireEvent.change(startDate, { target: { value: "1 Feb, 2023" } });
  //   fireEvent.click(endDate);
  //   fireEvent.change(endDate, { target: { value: "5 Feb, 2023" } });
  //   expect(screen.getByText("Submit")).toBeEnabled();
  //   //testing that checkbox is disabled and clicked twice
  //   const teamCheckBox = screen.getByTestId(
  //     mockFePod[1].podName
  //   ) as HTMLInputElement;
  //   fireEvent.click(teamCheckBox);
  //   expect(teamCheckBox).toBeChecked();
  //   const gangCheckbox = screen.getByTestId(
  //     mockFePod[2].podName
  //   ) as HTMLInputElement;
  //   expect(gangCheckbox).toBeDisabled();
  //   fireEvent.click(teamCheckBox);
  //   expect(teamCheckBox).not.toBeChecked();
  // });
});
