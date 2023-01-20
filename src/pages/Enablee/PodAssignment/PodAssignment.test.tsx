import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GetEnableesPendingPodAssignment } from "../../../services/EnableeAPI";
import { usePendingPodEnablees } from "../Hooks/customHook";
import PodAssignment from "./PodAssignment";
import { vi } from "vitest";

vi.mock("../Hooks/customHook");

describe("PodAssignment", () => {
  const receivedEnablees = [
    {
      employeeId: 0,
      firstName: "John",
      lastName: "Doe",
      dateOfJoin: new Date(1995, 11, 16),
      enablementStartDate: new Date(1995, 11, 18),
      enablementEndDate: new Date(1995, 12, 16),
      assetTag: "N/A",
      isEmployed: true,
      technology: {
        id: 1,
        name: "React",
      },
      countryCode: 200,
      gradeId: 10,
      communityId: 13,
      employementTypeId: 1,
      podId: 24,
      commentId: [1, 2, 3],
    },
  ];

  it("should render title, table, button", () => {
    (usePendingPodEnablees as jest.Mock).mockReturnValueOnce({
      receivedEnablees,
    });

    render(<PodAssignment />);
    expect(screen.getByText("Enablee")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "submit" })).toBeInTheDocument();
  });

  // it("should handle row selection", async () => {

  //   (usePendingPodEnablees  as jest.Mock).mockResolvedValueOnce(enableesList);
  //   render(<PodAssignment />);
  //   await waitFor(() =>
  //   expect(screen.queryAllByText(enableesList.data[0].firstName)).toHaveValue((enableesList.data[0].firstName)));
  // })
});
