import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { PageViewHeader } from "./PageViewHeader";

describe("PageViewHeader Component", () => {
  it("should contain input field props title of page", () => {
    render(
      <PageViewHeader
        pageTitle="Test Page"
        showPlus={false}
        isHeader={false}
        plusClicked={false}
      />
    );
  });
});
