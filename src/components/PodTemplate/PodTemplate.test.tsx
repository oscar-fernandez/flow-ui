import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PodTemplate from "./PodTemplate";

    describe("PodTemplate tests", () => {

    beforeEach(() => {
      render(<PodTemplate showPodTemplate={true} />);
    });

    it("should render pod template", () => {
        expect(screen.getByText("Submit")).toBeInTheDocument();
      });

     it("should handle name change", () => {
      
        const nameInput = screen.getByTestId("podName") as HTMLInputElement;
        fireEvent.change(nameInput, { target: { value: "test" } });
        expect(nameInput.value).toBe("test");
        fireEvent.change(nameInput, { target: { value: "" } });
        expect(screen.getByText("* Pod Name required")).toBeInTheDocument();
      });

      
    
    });

