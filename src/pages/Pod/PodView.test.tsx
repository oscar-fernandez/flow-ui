import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PodView from "./PodView";

describe("PodView tests", () => {
  it("should render", () => {
    render(<PodView></PodView>);
    expect(screen.getByText("Pod")).toBeInTheDocument();
  });
});
