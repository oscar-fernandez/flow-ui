import IProject from "../models/interfaces/IProject";

export const mockProjects: IProject[] = [
  {
    id: 1,
    name: "Pixelgram",
    summary: "Something about the project",
    technology: [
      {
        id: 3,
        name: "Java",
        backgroundColor: "yellow",
      },
      {
        id: 4,
        name: "Angular",
        backgroundColor: "green",
      },
      {
        id: 5,
        name: "SpringBoot",
        backgroundColor: "blue",
      },
    ],
    repoLink:
      "https://git.work.cognizant.studio/enablement/team-projects/flow/enablement",
  },
  {
    id: 2,
    name: "Flow",
    summary: "Something about the project",
    technology: [
      {
        id: 1,
        name: "TypeScript",
        backgroundColor: "red",
      },
      {
        id: 2,
        name: "React",
        backgroundColor: "orange",
      },
      {
        id: 3,
        name: "Java",
        backgroundColor: "yellow",
      },
      {
        id: 6,
        name: "MaterialUI",
        backgroundColor: "purple",
      },
    ],
    repoLink:
      "https://git.work.cognizant.studio/enablement/team-projects/flow/enablement",
  },
  {
    id: 3,
    name: "Quiz Monster",
    summary: "Something about the project",
    technology: [
      {
        id: 7,
        name: "JavaScript",
        backgroundColor: "orangered",
      },
      {
        id: 2,
        name: "React",
        backgroundColor: "orange",
      },
      {
        id: 3,
        name: "Java",
        backgroundColor: "yellow",
      },
      {
        id: 8,
        name: "Bootstrap",
        backgroundColor: "aqua",
      },
    ],
    repoLink:
      "https://git.work.cognizant.studio/enablement/team-projects/flow/enablement",
  },
];
