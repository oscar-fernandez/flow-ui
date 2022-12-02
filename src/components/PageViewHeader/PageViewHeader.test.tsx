import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { PageViewHeader } from "./PageViewHeader";

describe("PageViewHeader Component", () => {
  it("should contain input field props for logged in user and title of page", () => {
    render(
      <PageViewHeader name="test" pageTitle="Test Page" showPlus={false} />
    );
  });
});
