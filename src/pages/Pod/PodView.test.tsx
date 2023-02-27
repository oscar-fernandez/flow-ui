import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PodView from "./PodView";
import { MemoryRouter } from "react-router";

describe("PodView tests", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <PodView></PodView>
      </MemoryRouter>
    );
    expect(screen.getByText("Pod")).toBeInTheDocument();
  });
});
