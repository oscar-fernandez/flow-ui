import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import PodTemplate from "./PodTemplate";
import {
  ToggleArrowContext,
  ToggleContext,
  ToggleDetailsContext,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import ToggleSideBar from "../ToggleSideBar/ToggleSidebar";
import IFEPod from "../../models/interfaces/IFEPod";
import IEnablee from "../../models/interfaces/IEnablee";

describe("PodTemplate tests", () => {
  it("should render pod template", () => {
    render(<PodTemplate />);
    const sub = screen.getByText("Submit");
    expect(sub);
  });

  it("should handle name change", () => {
    render(<PodTemplate />);
    const nameInput = screen.getByTestId("podName") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(nameInput.value).toBe("test");
    fireEvent.change(nameInput, { target: { value: "" } });
    const err = screen.getByText("* Pod Name required");
    expect(err);
  });

  //render the list of projects
  it("should render the list of projects", async () => {
    render(<PodTemplate />);
    const dataBtn = screen.getByTestId("projectsBtn");
    await userEvent.click(dataBtn);
    const flow = screen.getByText("Flow");
    await userEvent.click(flow);
    const project = screen.getByText("Flow");
    expect(project);
  });

  //render the list of available enablees
  it("should render the list of available enablees", async () => {
    render(<PodTemplate />);
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
    expect(screen.getByText("Submit")).toBeDisabled();
    await userEvent.click(startDate);
    fireEvent.change(startDate, { target: { value: threeDay } });
    await userEvent.click(endDate);
    fireEvent.change(endDate, { target: { value: later } });
    await userEvent.click(projectBtn);
    const pixle = screen.getByText("Pixelgram");
    fireEvent.click(pixle);
  });

  //test the useEffect
  it("Should mess with the useEffect", async () => {
    render(
      <ToggleContext.Provider value={[true, () => false]}>
        {" "}
        <ToggleArrowContext.Provider value={[false, () => false]}>
          {" "}
          <ToggleDetailsContext.Provider value={[createPod(), () => null]}>
            <ToggleSideBar template={<PodTemplate />} />
          </ToggleDetailsContext.Provider>
        </ToggleArrowContext.Provider>
      </ToggleContext.Provider>
    );
  });
});

function addDays(date: Date, days: number) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

const createPod = (): IFEPod => {
  const thisDate = new Date();
  return {
    id: 1,
    podName: "podCrew",
    podStartDate: thisDate.toString(),
    podEndDate: addDays(thisDate, 30).toString(),
    enablee: [],
    enabler: null,
    project: { id: 1, name: "foo", summary: "", technology: [], repoLink: "" },
  };
};

const createEnablee = (): IEnablee => {
  const thisDate = new Date();
  const newDate = addDays(thisDate, 5);
  return {
    employeeId: 1,
    firstName: "Steve",
    lastName: "Bob",
    dateOfJoin: Date.now().toString(),
    enablementStartDate: Date.now().toString(),
    enablementEndDate: newDate.toString(),
    assetTag: "I Don't know",
    isEmployed: false,
    technology: [
      { id: 2, name: "Java", backgroundColor: "grey" },
      { id: 8, name: "React", backgroundColor: "blue" },
      { id: 12, name: "Rust", backgroundColor: "brown" },
      { id: 12, name: "C++", backgroundColor: "yellow" },
    ],
    countryCode: 1,
    gradeId: 1,
    communityId: 1,
    employmentTypeId: 1,
    podId: 1,
    commentId: [1, 2, 3],
  };
};
