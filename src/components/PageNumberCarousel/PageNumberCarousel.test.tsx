import { beforeAll, describe, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PageNumberCarousel from "./PageNumberCarousel";

describe("PageNumber with one page", () => {
  beforeAll(() => {
    render(<PageNumberCarousel totalPages={1} />);
  });
  it("'Previous page' button is disabled"),
    () => {
      const previousPageButton = screen.getByRole("button", {
        name: "Previous page",
      });
      expect(previousPageButton).toBeDisabled();
    };
  it("'Next page' button is disabled'"),
    () => {
      const nextPageButton = screen.getByRole("button", {
        name: "Next page",
      });
      expect(nextPageButton).toBeDisabled();
    };
  it("'Go button' is disabled"),
    () => {
      const goButton = screen.getByRole("button", { name: "Go" });
      expect(goButton).toBeDisabled();
    };
  it("Link to page 1 is current page"),
    () => {
      const pageOneLink = screen.getByRole("link", { name: "1" });
      expect(pageOneLink).toHaveStyle("color: #DC8D0B");
    };
});

describe("PageNumber with multiple pages", () => {
  beforeAll(() => {
    render(<PageNumberCarousel totalPages={5} />);
  });
  it("'Next page' button is enabled"),
    () => {
      const nextPageButton = screen.getByRole("button", {
        description: "Next page",
      });
      expect(nextPageButton).toBeEnabled();
    };
  it("Last page number link is equal to totalPages prop"),
    () => {
      expect(screen.getByRole("link", { name: "5" })).toBeInTheDocument();
    };
  it("'...' is present when totalPages is greater than 3"),
    () => {
      expect(screen.getByText("...")).toBeInTheDocument();
    };
  it("Link to page 2 is current after clicking next page"),
    () => {
      const nextPageButton = screen.getByRole("button", {
        description: "Next page",
      });
      const pageTwoLink = screen.getByRole("link", { name: "5" });
      fireEvent.click(nextPageButton);
      expect(pageTwoLink).toHaveStyle("color: #DC8D0B");
    };
  it(
    "Link to page 1 is current after clicking on next page and then previous page"
  ),
    () => {
      const nextPageButton = screen.getByRole("button", {
        description: "Next page",
      });
      const previousPageButton = screen.getByRole("button", {
        name: "Previous page",
      });
      const pageOneLink = screen.getByRole("link", { name: "1" });
      fireEvent.click(nextPageButton);
      fireEvent.click(previousPageButton);
      expect(pageOneLink).toHaveStyle("color: #DC8D0B");
    };
  it("Current page corresponds to user input"),
    () => {
      const pageInput = screen.getByRole("input");
      const goButton = screen.getByRole("button", { name: "Go" });
      const pageFourLink = screen.getByRole("link", { name: "4" });
      expect(pageFourLink).toHaveStyle("color: #000048");
      fireEvent.change(pageInput, { target: { value: "4" } });
      fireEvent.click(goButton);
      expect(pageFourLink).toHaveStyle("color: #DC8D0B");
    };
  it("'Next page' button is disabled while on last page"),
    () => {
      const pageFiveLink = screen.getByRole("link", { name: "5" });
      const nextPageButton = screen.getByRole("button", {
        name: "Next page",
      });
      fireEvent.click(pageFiveLink);
      expect(nextPageButton).toBeDisabled();
    };
});
