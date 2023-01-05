import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AlertContainer from "./AlertContainer";

describe("AlertContainer tests", () => {
  it("should render", () => {
    let bool = false;
    const handleClick = () => {
      bool = true;
    };
    render(
      <AlertContainer
        text="text"
        buttonText="button"
        handleClick={handleClick}
      ></AlertContainer>
    );
    expect(screen.getByText("button")).toBeInTheDocument();
  });
});
