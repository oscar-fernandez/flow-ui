import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EnableeTemplate from "./EnableeTemplate";

describe("EnableeTemplate tests", () => {
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

  it("should disable submit button until all required fields are entered", () => {
    render(<EnableeTemplate />);
    const nameInput = screen.getByTestId("enableeName") as HTMLInputElement;
    const employeeId = screen.getByTestId("employeeId") as HTMLInputElement;
    const startDate = screen.getByPlaceholderText("No Start Date Selected");
    const endDate = screen.getByPlaceholderText("No End Date Selected");
    expect(screen.getByText("Submit")).toBeDisabled();
    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(employeeId, { target: { value: "test" } });
    fireEvent.click(startDate);
    fireEvent.change(startDate, { target: { value: "1 Feb, 2023" } });
    fireEvent.click(endDate);
    fireEvent.change(endDate, { target: { value: "5 Feb, 2023" } });
    expect(screen.getByText("Submit")).toBeEnabled();
  });
});