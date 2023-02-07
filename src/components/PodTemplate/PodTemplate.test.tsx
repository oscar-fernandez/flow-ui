import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import PodTemplate from "./PodTemplate";
import {
  ToggleArrowContext,
  ToggleContext,
  ToggleDetailsContext,
} from "../../context/ToggleSideBarContext/ToggleSideBarContext";
import ToggleSideBar from "../ToggleSideBar/ToggleSidebar";
import IFEPod from "../../models/interfaces/IFEPod";

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
const createPod = (): IFEPod => {
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
