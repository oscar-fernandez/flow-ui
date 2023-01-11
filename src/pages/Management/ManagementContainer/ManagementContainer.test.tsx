import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ManagementContainer from "./ManagementContainer";
import ManagementView from "./ManagementContainer";
import {
  createProject,
  getProjects,
  getTechnologies,
} from "../../../services/ManagementAPI";

vi.mock("../../../services/ManagementAPI");
describe("Management View page", () => {
  it("should display management view page with correct components", () => {
    (getProjects as jest.Mock).mockResolvedValueOnce([]);
    (getTechnologies as jest.Mock).mockResolvedValueOnce([]);
    render(<ManagementView />);
    expect(screen.getByText("Management")).toBeInTheDocument();
  });

  it("should toggle show form", () => {
    (getProjects as jest.Mock).mockResolvedValueOnce([]);
    (getTechnologies as jest.Mock).mockResolvedValueOnce([]);
    render(<ManagementContainer />);
    const button = screen.getByTestId("button") as HTMLButtonElement;
    fireEvent.click(button);
  });

  it("should handle tabs click and render appropriate view", () => {
    (getProjects as jest.Mock).mockResolvedValueOnce([]);
    (getTechnologies as jest.Mock).mockResolvedValueOnce([]);
    render(<ManagementContainer />);
    const technologyTab = screen.getByTestId("techTab");
    fireEvent.click(technologyTab);
    const addSkill = screen.getByTestId("button") as HTMLButtonElement;
    expect(addSkill.value).toBe("");
  });

  it("should handle row selection", async () => {
    const projects = {
      data: [
        {
          id: 1,
          name: "PixelGram",
          summary: "",
          technology: [
            { id: 2, name: "Java" },
            { id: 8, name: "React" },
            { id: 12, name: "Rust" },
            { id: 12, name: "C++" },
          ],
          repoLink: "google.com",
        },
        {
          id: 2,
          name: "Flow-E",
          summary: "",
          technology: [
            { id: 2, name: "Java" },
            { id: 8, name: "React" },
            { id: 12, name: "Rust" },
            { id: 12, name: "C++" },
          ],
          repoLink: "google.com",
        },
      ],
    };

    const technologies = {
      data: [
        {
          id: 3,
          name: "Java",
        },
        {
          id: 4,
          name: "React",
        },
        {
          id: 5,
          name: "Ruby",
        },
        {
          id: 3,
          name: "Spring Framework",
        },
      ],
    };

    (getProjects as jest.Mock).mockResolvedValueOnce(projects);
    (getTechnologies as jest.Mock).mockResolvedValueOnce(technologies);

    render(<ManagementContainer />);
    await waitFor(() =>
      expect(screen.queryByText(projects.data[0].name)).toHaveTextContent(
        projects.data[0].name
      )
    );

    const row = screen.queryAllByTestId("table-row")?.[0];
    fireEvent.click(row);
    const title = screen.getByText("Project Details");
    expect(title).toBeInTheDocument();
    expect(screen.getByDisplayValue(projects.data[0].name)).toHaveValue(
      projects.data[0].name
    );
    expect(screen.getByText("Back to Projects...")).toBeInTheDocument();
  });

  it("should return correct headers", () => {
    (getProjects as jest.Mock).mockResolvedValueOnce([]);
    (getTechnologies as jest.Mock).mockResolvedValueOnce([]);

    render(<ManagementContainer />);
    const gradeTab = screen.getByText("Grade");
    fireEvent.click(gradeTab);
    const addSkill = screen.getByTestId("button") as HTMLButtonElement;
    expect(addSkill.value).toBe("");
  });

  it("should handle cancel on add project view", () => {
    const projects = {
      data: [
        {
          id: 1,
          name: "PixelGram",
          summary: "",
          technology: [
            { id: 2, name: "Java" },
            { id: 8, name: "React" },
            { id: 12, name: "Rust" },
            { id: 12, name: "C++" },
          ],
          repoLink: "google.com",
        },
        {
          id: 2,
          name: "Flow-E",
          summary: "",
          technology: [
            { id: 2, name: "Java" },
            { id: 8, name: "React" },
            { id: 12, name: "Rust" },
            { id: 12, name: "C++" },
          ],
          repoLink: "google.com",
        },
      ],
    };

    const technologies = {
      data: [
        {
          id: 3,
          name: "Java",
        },
        {
          id: 4,
          name: "React",
        },
        {
          id: 5,
          name: "Ruby",
        },
        {
          id: 3,
          name: "Spring Framework",
        },
      ],
    };
    (getProjects as jest.Mock).mockResolvedValueOnce(projects);
    (getTechnologies as jest.Mock).mockResolvedValueOnce(technologies);

    render(<ManagementContainer />);
    const addButton = screen.getByTestId("button") as HTMLButtonElement;
    fireEvent.click(addButton);
    const cancelButton = screen.getByText("Cancel") as HTMLButtonElement;
    fireEvent.click(cancelButton);
  });

  it("should toggle edit", async () => {
    const projects = {
      data: [
        {
          id: 1,
          name: "PixelGram",
          summary: "",
          technology: [
            { id: 2, name: "Java" },
            { id: 8, name: "React" },
            { id: 12, name: "Rust" },
            { id: 12, name: "C++" },
          ],
          repoLink: "google.com",
        },
        {
          id: 2,
          name: "Flow-E",
          summary: "",
          technology: [
            { id: 2, name: "Java" },
            { id: 8, name: "React" },
            { id: 12, name: "Rust" },
            { id: 12, name: "C++" },
          ],
          repoLink: "google.com",
        },
      ],
    };

    const technologies = {
      data: [
        {
          id: 3,
          name: "Java",
        },
        {
          id: 4,
          name: "React",
        },
        {
          id: 5,
          name: "Ruby",
        },
        {
          id: 3,
          name: "Spring Framework",
        },
      ],
    };

    (getProjects as jest.Mock).mockResolvedValueOnce(projects);
    (getTechnologies as jest.Mock).mockResolvedValueOnce(technologies);
    render(<ManagementContainer />);

    let selectedRow;
    let editButton;
    let cancel;

    /* await waitFor(() => {
      selectedRow = screen.queryByText(projects.data[0].name);
      editButton = screen.getByText("Edit Project");
      cancel = screen.getByText("Cancel");

      selectedRow && fireEvent.click(selectedRow);
     
      editButton && fireEvent.click(editButton);
      cancel && fireEvent.click(cancel);
    });  */
  });

  it("should handle new technology", async () => {
    const projects = {
      data: [
        {
          id: 1,
          name: "PixelGram",
          summary: "",
          technology: [
            { id: 2, name: "Java" },
            { id: 8, name: "React" },
            { id: 12, name: "Rust" },
            { id: 12, name: "C++" },
          ],
          repoLink: "google.com",
        },
        {
          id: 2,
          name: "Flow-E",
          summary: "",
          technology: [
            { id: 2, name: "Java" },
            { id: 8, name: "React" },
            { id: 12, name: "Rust" },
            { id: 12, name: "C++" },
          ],
          repoLink: "google.com",
        },
      ],
    };

    const technologies = {
      data: [
        {
          id: 3,
          name: "Java",
        },
        {
          id: 4,
          name: "React",
        },
        {
          id: 5,
          name: "Ruby",
        },
        {
          id: 3,
          name: "Spring Framework",
        },
      ],
    };
    (getProjects as jest.Mock).mockResolvedValueOnce(projects);
    (getTechnologies as jest.Mock).mockResolvedValueOnce(technologies);

    render(<ManagementContainer />);
    const technologyTab = screen.getByTestId("techTab");
    expect(technologyTab).toBeInTheDocument();
    fireEvent.click(technologyTab);
    const addSkill = screen.getByTestId("button") as HTMLButtonElement;
    expect(addSkill).toBeInTheDocument();
    fireEvent.click(addSkill);
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });
    await waitFor(() => {
      expect(input).not.toBeInTheDocument();
    });
  });
});
