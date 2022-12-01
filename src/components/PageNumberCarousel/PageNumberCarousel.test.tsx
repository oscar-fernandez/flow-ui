import React from "react";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PageNumberCarousel from "./PageNumberCarousel";

describe("PageNumberCarousel", () => {
  beforeEach(() => {
    render(<PageNumberCarousel totalPages={10} />);
  });

  it('should have a "Next page" button', () => {
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    expect(nextPageButton).toBeTruthy();
  });

  it('should enable previous page button after clicking "Next page"', () => {
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    fireEvent.click(nextPageButton);
    expect(previousPageButton).toBeEnabled();
  });

  it('should disable "Next Page" when on last page', () => {
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    for (let i = 0; i < 9; i++) {
      fireEvent.click(nextPageButton);
    }
    expect(nextPageButton).toBeDisabled();
  });

  it('should disable "Previous page" button when on first page', () => {
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    fireEvent.click(nextPageButton);
    fireEvent.click(previousPageButton);
    expect(previousPageButton).toBeDisabled();
  });

  it("should have both buttons enabled", () => {
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    for (let i = 0; i < 4; i++) {
      fireEvent.click(nextPageButton);
    }
    fireEvent.click(previousPageButton);
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeEnabled();
  });
});
