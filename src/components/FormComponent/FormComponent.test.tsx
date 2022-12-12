import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import FormComponent from "./FormComponent";

describe("FormComponent", () => {
  it("should render form comonent", () => {
    render(<FormComponent />);
  });
});
