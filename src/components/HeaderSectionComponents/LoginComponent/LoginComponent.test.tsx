import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { LoginComponent } from "./LoginComponent";

describe("Login Component", () => {
  it("should contain input field props for logged in user", () => {
    render(<LoginComponent name="test" />);
  });
});
