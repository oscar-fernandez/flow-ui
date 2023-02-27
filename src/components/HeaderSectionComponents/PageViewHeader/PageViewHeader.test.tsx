import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { PageViewHeader } from "./PageViewHeader";
import { MemoryRouter } from "react-router";

describe("PageViewHeader Component", () => {
  it("should contain input field props title of page", () => {
    render(
      <MemoryRouter>
        <PageViewHeader
          pageTitle="Test Page"
          showPlus={false}
          isHeader={false}
          plusClicked={false}
        />
      </MemoryRouter>
    );
  });
});
