import { fireEvent, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FormComponent from "../../../components/FormComponent/FormComponent";
import ManagementContainer from "./ManagementContainer";
import ManagementView from "./ManagementContainer";

describe("Management View page", () => {
  it("should display management view page with correct components", () => {
    render(<ManagementView />);
  });

  it("should toggle show form", () => {
    const utils = render(<ManagementContainer />);
    const button = utils.getByTestId("button") as HTMLButtonElement;
    fireEvent.click(button);
  });
});
