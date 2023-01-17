import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(isEmployed).not.toBeChecked();
    fireEvent.click(isEmployed);
    expect(isEmployed).toBeChecked();
  });

  it("should handle grade change", () => {
    render(<EnableeTemplate />);
    const grade = screen.getByTestId("grade") as HTMLInputElement;
    fireEvent.change(grade, { target: { value: "test" } });
    expect(grade.value).toBe("test");
  });

  it("should disable submit button if all fiels are not entered", () => {
    render(<EnableeTemplate />);
    const nameInput = screen.getByTestId("enableeName") as HTMLInputElement;
    const employeeId = screen.getByTestId("employeeId") as HTMLInputElement;
    const assetTag = screen.getByTestId("assetTag") as HTMLInputElement;
    const country = screen.getByTestId("country") as HTMLInputElement;
    const community = screen.getByTestId("community") as HTMLInputElement;
    const employmentType = screen.getByTestId(
      "employmentType"
    ) as HTMLInputElement;
    const grade = screen.getByTestId("grade") as HTMLInputElement;
    expect(screen.getByText("Submit")).toBeDisabled();
    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(employeeId, { target: { value: "test" } });
    fireEvent.change(assetTag, { target: { value: "test" } });
    fireEvent.change(country, { target: { value: "test" } });
    fireEvent.change(community, { target: { value: "test" } });
    fireEvent.change(employmentType, { target: { value: "test" } });
    fireEvent.change(grade, { target: { value: "test" } });
    expect(screen.getByText("Submit")).toBeEnabled();
  });
});
