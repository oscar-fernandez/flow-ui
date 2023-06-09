import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Row from "./Row";
import ITechnology from "../../models/interfaces/ITechnology";

describe("Row tests", () => {
  it("Render row", () => {
    render(
      <Row
        onClick={() => {
          return;
        }}
      ></Row>
    );
    const rowComp = screen.getByTestId("rowTest");
    expect(rowComp).toBeInTheDocument();
  });

  it("Should click on the row", () => {
    const expectedChild = "Some Item";

    const mockClicFn = vi.fn();

    render(<Row onClick={mockClicFn}>{<p>{expectedChild}</p>}</Row>);

    const actualChild = screen.getByText("Some Item");

    expect(actualChild).toBeInTheDocument();
    fireEvent.click(actualChild);
    expect(mockClicFn).toHaveBeenCalled();
  });

  //   it("Renders the row but no text in tech stack portion", () => {
  //     render(createRow([]));
  //     const tsText = screen.queryByTestId("tech-stack");
  //     expect(tsText).toBeEmptyDOMElement();
  //   });

  //   it("Should render java in the component", () => {
  //     render(createRow([{ id: 1, name: "Java", backgroundColor: "grey" }]));
  //     const tsText = screen.queryByTestId("tech-stack");
  //     expect(tsText?.innerHTML).toContain("Java");
  //   });

  //   it("Should render tooltip while rendering row component", async () => {
  //     render(
  //       createRow([
  //         { id: 1, name: "Java", backgroundColor: "grey" },
  //         { id: 2, name: "React", backgroundColor: "blue" },
  //         { id: 3, name: "Node.js", backgroundColor: "green" },
  //       ])
  //     );
  //     const tsText = screen.queryByTestId("tech-stack");
  //     tsText && userEvent.hover(tsText);
  //     await waitFor(() => screen.findByRole("tooltip"));
  //     expect(screen.getByText("Java, React, Node.js")).toBeInTheDocument();
  //   });

  //   it("should render ... when there is more than 3 elements", () => {
  //     render(
  //       createRow([
  //         { id: 1, name: "Java", backgroundColor: "grey" },
  //         { id: 2, name: "React", backgroundColor: "blue" },
  //         { id: 3, name: "Node.js", backgroundColor: "green" },
  //       ])
  //     );
  //     const tsText = screen.queryByTestId("tech-stack");
  //     expect(tsText).toBeInTheDocument();
  //     expect(tsText?.innerHTML).toContain("...");
  //   });
});

// const createRow = () => {
//   return (
//     <Row onClick={() => return}>
//       <p>This is a row</p>
//     </Row>
// );
// })
