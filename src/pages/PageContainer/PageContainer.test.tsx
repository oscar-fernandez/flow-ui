import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageContainer from "./PageContainer";

describe("PageContainer", () => {
  it("should contain 'page-container' class", () => {
    render(<PageContainer />);
  });
});
