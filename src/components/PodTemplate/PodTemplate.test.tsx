import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PodTemplate from "./PodTemplate";

describe("PodTemplate tests", () => {
    it("should render enablee template", () => {
        render(<PodTemplate showPodTemplate={true} />);
        expect(screen.getByText("Submit")).toBeInTheDocument();
      });
    });

