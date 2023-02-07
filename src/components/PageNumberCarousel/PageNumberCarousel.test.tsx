import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PageNumberCarousel from "./PageNumberCarousel";
import { dummyEnablees } from "../../data/EnableeMock";
import { useAllEnablees } from "../../pages/Enablee/Hooks/useAllEnablees";
import { EnableePageContainer } from "../../pages/Enablee/EnableePageContainer/EnableePageContainer";

vi.mock("../../pages/Enablee/Hooks/useAllEnablees");

const mockUseAllEnablees = useAllEnablees as jest.MockedFunction<
  typeof useAllEnablees
>;

describe("PageNumberCarousel", () => {
  it('should have a "Next page" button', () => {
    render(
      <PageNumberCarousel
        totalPages={10}
        setPage={() => {
          return;
        }}
        currentPageNumber={1}
      />
    );
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    expect(nextPageButton).toBeInTheDocument();
  });

  it('previous page should be enabled if currentPage > 1"', () => {
    render(
      <PageNumberCarousel
        totalPages={10}
        setPage={() => {
          return;
        }}
        currentPageNumber={2}
      />
    );
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    expect(previousPageButton).toBeEnabled();
  });

  it('should disable "Next Page" when on last page', () => {
    render(
      <PageNumberCarousel
        totalPages={10}
        setPage={() => {
          return;
        }}
        currentPageNumber={10}
      />
    );
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    expect(nextPageButton).toBeDisabled();
  });

  it('should disable "Previous page" button when on first page', () => {
    render(
      <PageNumberCarousel
        totalPages={10}
        setPage={() => {
          return;
        }}
        currentPageNumber={1}
      />
    );
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    expect(previousPageButton).toBeDisabled();
  });

  it("should have both buttons enabled", () => {
    render(
      <PageNumberCarousel
        totalPages={10}
        setPage={() => {
          return;
        }}
        currentPageNumber={3}
      />
    );
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    // fireEvent.click(nextPageButton);
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeEnabled();
  });

  it("should have both buttons enabled", () => {
    render(
      <PageNumberCarousel
        totalPages={10}
        setPage={() => {
          return;
        }}
        currentPageNumber={9}
      />
    );
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    fireEvent.click(previousPageButton);
    expect(nextPageButton).toBeEnabled();
  });

  it("should enable/disable previous and next page buttons correctly", () => {
    const pageOfItems = [
      {
        items: dummyEnablees,
        hasNext: false,
        totalElements: 250,
      },
      vi.fn(() => null),
    ];
    mockUseAllEnablees.mockReturnValue(pageOfItems);
    render(
      <EnableePageContainer hook={useAllEnablees} displayPageCarousel={true} />
    );
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    //Click order matters since not all page numbers are rendered simultaneously
    fireEvent.click(screen.getByText("10"));
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeDisabled();
    fireEvent.click(screen.getByText("9"));
    fireEvent.click(nextPageButton);
    expect(nextPageButton).toBeDisabled();
    fireEvent.click(screen.getByText("7"));
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeEnabled();
    fireEvent.click(screen.getByText("10"));
    fireEvent.click(screen.getByText("1"));
    expect(nextPageButton).toBeEnabled();
    expect(previousPageButton).toBeDisabled();
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(previousPageButton);
    expect(previousPageButton).toBeDisabled();
    fireEvent.click(nextPageButton);
    expect(previousPageButton).toBeEnabled();
  });

  it("should handle page size less than 5", () => {
    const pageOfItems = [
      {
        items: dummyEnablees,
        hasNext: false,
        totalElements: 100,
      },
      vi.fn(() => null),
    ];
    mockUseAllEnablees.mockReturnValue(pageOfItems);
    render(
      <EnableePageContainer hook={useAllEnablees} displayPageCarousel={true} />
    );
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("4"));
    expect(nextPageButton).toBeDisabled();
  });

  it("goes to the page that is submitted by the user", () => {
    const pageOfItems = [
      {
        items: dummyEnablees,
        hasNext: false,
        totalElements: 250,
      },
      vi.fn(() => null),
    ];
    mockUseAllEnablees.mockReturnValue(pageOfItems);
    render(
      <EnableePageContainer hook={useAllEnablees} displayPageCarousel={true} />
    );
    const input = screen.getByRole("textbox");
    const goButton = screen.getByRole("button", { name: "Go" });
    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.click(goButton);
    const nextPageButton = screen.getByRole("button", {
      name: "Next page",
    });
    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeEnabled();
  });

  it('displays alert "* Invalid Page Number" when submitted page number is out of range', async () => {
    const pageOfItems = [
      {
        items: dummyEnablees,
        hasNext: false,
        totalElements: 250,
      },
      vi.fn(() => null),
    ];
    mockUseAllEnablees.mockReturnValue(pageOfItems);
    render(
      <EnableePageContainer hook={useAllEnablees} displayPageCarousel={true} />
    );
    const input = screen.getByRole("textbox");
    const goButton = screen.getByRole("button", { name: "Go" });
    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.click(goButton);
    const alert = await screen.findByText("* Invalid Page Number");
    expect(alert).toBeInTheDocument();
  });
});
