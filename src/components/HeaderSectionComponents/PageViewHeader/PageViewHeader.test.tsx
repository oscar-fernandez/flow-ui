import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageViewHeader } from "./PageViewHeader";
import userEvent from "@testing-library/user-event";

describe("PageViewHeader Component", () => {
  it("should contain input field props title of page", () => {
    render(<PageViewHeader pageTitle="Test Page" showPlus={false} />);
  });
});
