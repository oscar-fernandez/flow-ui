import { describe, it, expect } from "vitest";
import {render, screen} from "@testing-library/react";
import App from "./App";

describe("Dummy tests", () => {
    it("should be true", () => {
        expect(true).toBe(true);
    })
    it("should render App", () => {
        render(<App />);
        expect(screen.getByText("Flow-E")).toBeInTheDocument();
    })
})