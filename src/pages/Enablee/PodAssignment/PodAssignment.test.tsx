import { render, screen } from "@testing-library/react";
import { describe, it, expect, vitest } from "vitest";
import PodAssignment from "./PodAssignment";
import { dummyEnablees } from "../../../data/EnableeMock";
import axios from "axios";
import { GetEnableesPendingPodAssignment } from "../../../services/EnableeAPI";

describe("PodAssignment", () => {
  it("should render title, table, button", () => {
    render(<PodAssignment />);
    expect(screen.getByText("Assign Enablees to Pod")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "submit" })).toBeInTheDocument();
  });

  // it('should call api and receive response', async () => {});
});
