import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import FormComponent from "./FormComponent";
import { getProjects, createProject } from "../../services/ManagementAPI";

vi.mock("../../services/ManagementAPI");
describe("FormComponent", () => {
  let ts: any = [];
  beforeEach(() => {
    ts = [
      { id: 0, name: "Java", backgroundColor: "grey" },
      { id: 1, name: "React", backgroundColor: "blue" },
      { id: 2, name: "SpringBoot", backgroundColor: "green" },
      { id: 3, name: "Jenkins", backgroundColor: "black" },
      { id: 4, name: "Docker", backgroundColor: "darkblue" },
      { id: 5, name: "Angular", backgroundColor: "red" },
    ];
  });
  it("should render form component", () => {
    render(<FormComponent technologies={ts} />);
    expect(screen.getByTestId("title")).toBeInTheDocument();
  });

  it("Should save new project on submit click", () => {
    (createProject as jest.Mock).mockResolvedValueOnce({});
    //const handleSubmit= jest.fn();
    const handleProjectChange = vi.fn(() => "outside callback");
    const handleClick = vi.fn(() => "outside callback");

    render(
      <FormComponent
        handleProjectChange={handleProjectChange}
        handleClick={handleClick}
        technologies={ts}
        title="Add Project"
        edit={false}
      />
    );
    const projectName = screen.getByTestId("pName") as HTMLInputElement;
    const repoLink = screen.getByTestId("pLink") as HTMLInputElement;
    const summary = screen.getByTestId("pDesc") as HTMLInputElement;
    const submitButton = screen.getByTestId(
      "submitButton"
    ) as HTMLButtonElement;
    projectName.value = "projectTest";
    repoLink.value =
      "https://git.work.cognizant.studio/enablement/team-projects/a";
    summary.value = "project test ";

    const project = {
      id: 100,
      name: "projectTest",
      repoLink: "https://git.work.cognizant.studio/enablement/team-projects/a",
      summary: "project test ",
      technologies: {},
    };

    (createProject as jest.Mock).mockResolvedValueOnce(project);

    submitButton.click();

    expect(projectName.value).toBe("projectTest");
    expect(repoLink.value).toBe(
      "https://git.work.cognizant.studio/enablement/team-projects/a"
    );
    expect(summary.value).toBe("project test ");
  });

  it("should clear input fields on reset click", () => {
    render(<FormComponent technologies={ts} edit={false} />);
    const projectName = screen.getByTestId("pName") as HTMLInputElement;
    const repoLink = screen.getByTestId("pLink") as HTMLInputElement;
    const summary = screen.getByTestId("pDesc") as HTMLInputElement;

    const resetButton = screen.getByTestId("resetButton");

    projectName.value = "test";
    repoLink.value = "test";
    summary.value = "test";

    resetButton.click();

    expect(projectName.value).toBe("test");
    expect(repoLink.value).toBe("test");
    expect(summary.value).toBe("test");
  });

  it("should render edit form component", () => {
    const project = {
      id: 100,
      name: "projectTest",
      repoLink: "https://git.work.cognizant.studio/enablement/team-projects/a",
      summary: "project test ",
      technologies: {},
    };

    render(<FormComponent project={project} technologies={ts} edit={true} />);
    expect(screen.getByTestId("title")).toBeInTheDocument();
  });

  it("should render edit form component with project data", () => {
    const project = {
      id: 100,
      name: "projectTest",
      repoLink: "https://git.work.cognizant.studio/enablement/team-projects/a",
      summary: "project test ",
      technologies: {},
    };

    render(<FormComponent project={project} technologies={ts} edit={true} />);
    expect(screen.getByTestId("title")).toBeInTheDocument();
  });

  it("should update project on submit click", () => {
    const project = {
      id: 100,
      name: "projectTest",
      repoLink: "https://git.work.cognizant.studio/enablement/team-projects/a",
      summary: "project test ",
      technologies: {},
    };

    render(<FormComponent project={project} technologies={ts} edit={true} />);
    const projectName = screen.getByTestId("pName") as HTMLInputElement;
    const repoLink = screen.getByTestId("pLink") as HTMLInputElement;
    const summary = screen.getByTestId("pDesc") as HTMLInputElement;
    const editBtn = screen.getByTestId("editBtn") as HTMLButtonElement;
    projectName.value = "projectTest";
    repoLink.value =
      "https://git.work.cognizant.studio/enablement/team-projects/a";
    summary.value = "project test ";

    const project1 = {
      id: 100,
      name: "projectTest",
      repoLink: "https://git.work.cognizant.studio/enablement/team-projects/a",
      summary: "project test ",
      technologies: {},
    };

    (createProject as jest.Mock).mockResolvedValueOnce(project1);

    editBtn.click();

    expect(projectName.value).toBe("projectTest");
    expect(repoLink.value).toBe(
      "https://git.work.cognizant.studio/enablement/team-projects/a"
    );
    expect(summary.value).toBe("project test ");
  });
});
