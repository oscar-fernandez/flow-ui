import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ToggleGeneralForm from "./ToggleGeneralForm";
import userEvent from "@testing-library/user-event";

describe("ToggleGeneralForm tests", () => {
  it("should render", () => {
    render(<ToggleGeneralForm />);
    expect(screen.getByText("Employee Id")).toBeInTheDocument();
  });

  it("should handle select", async () => {
    render(<ToggleGeneralForm />);
    const select = screen.getAllByRole("button");
    const selectCity = select[0] as HTMLSelectElement;
    const selectState = select[1] as HTMLSelectElement;
    const selectCountry = select[2] as HTMLSelectElement;
    userEvent.click(select[0]);
    const dropdownCity = await screen.findByRole("option", { name: "Chicago" });
    await userEvent.click(dropdownCity);

    userEvent.click(select[1]);
    const dropdownState = await screen.findByRole("option", { name: "IL" });
    await userEvent.click(dropdownState);

    userEvent.click(select[2]);
    const dropdownCountry = await screen.findByRole("option", {
      name: "United States",
    });
    await userEvent.click(dropdownCountry);

    expect(selectCity.innerHTML).toBe("Chicago");
    expect(selectState.innerHTML).toBe("IL");
    expect(selectCountry.innerHTML).toBe("United States");
  });
});
