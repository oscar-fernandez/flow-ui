import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PageNumberCarousel from "./PageNumberCarousel";

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

  // it("goes to the page that is submitted by the user", () => {
  //   render(<PageNumberCarousel totalPages={10} setPage={()=>{return}} currentPageNumber={1} />);
  //   const input = screen.getByRole("textbox");
  //   const goButton = screen.getByRole("button", { name: "Go" });
  //   fireEvent.change(input, { target: { value: "5" } });
  //   fireEvent.click(goButton);
  //   const nextPageButton = screen.getByRole("button", {
  //     name: "Next page",
  //   });
  //   const previousPageButton = screen.getByRole("button", {
  //     name: "Previous page",
  //   });
  //   expect(previousPageButton).toBeEnabled();
  //   expect(nextPageButton).toBeEnabled();
  // });

  // it("goes to the page that is submitted by the user", () => {
  //   render(<PageNumberCarousel totalPages={10}  setPage={()=>{return}} currentPageNumber={1}/>);
  //   const previousPageButton = screen.getByRole("button", {
  //     name: "Previous page",
  //   });
  //   expect(previousPageButton).toBeDisabled();
  // });

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

  // it("should enable/disable previous and next page buttons correctly", () => {
  //   render(<PageNumberCarousel totalPages={10} setPage={()=>{return}} currentPageNumber={1} />);
  //   const nextPageButton = screen.getByRole("button", {
  //     name: "Next page",
  //   });
  //   const previousPageButton = screen.getByRole("button", {
  //     name: "Previous page",
  //   });
  //   fireEvent.click(screen.getByText("10"));
  //   expect(previousPageButton).toBeEnabled();
  //   expect(nextPageButton).toBeDisabled();
  //   fireEvent.click(screen.getByText("7"));
  //   expect(previousPageButton).toBeEnabled();
  //   expect(nextPageButton).toBeEnabled();
  //   fireEvent.click(screen.getByText("10"));
  //   fireEvent.click(screen.getByText("1"));
  //   expect(nextPageButton).toBeEnabled();
  //   expect(previousPageButton).toBeDisabled();
  // });

  //   it("should handle page size less than 5", () => {
  //     render(<PageNumberCarousel totalPages={4}  setPage={()=>{return}} currentPageNumber={1}/>);
  //     const nextPageButton = screen.getByRole("button", {
  //       name: "Next page",
  //     });
  //     const previousPageButton = screen.getByRole("button", {
  //       name: "Previous page",
  //     });
  //     fireEvent.click(screen.getByText("2"));
  //     fireEvent.click(screen.getByText("3"));
  //     fireEvent.click(screen.getByText("4"));
  //     expect(nextPageButton).toBeDisabled();
  //   });
});
