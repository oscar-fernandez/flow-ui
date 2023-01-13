import { describe, it, expect, vi } from "vitest";

import {
  getTechnologies,
  updateTechnology,
  createTechnology,
  getProjects,
  updateProject,
  createProject,
} from "./ManagementAPI";

import axios from "axios";

vi.mock("axios");

describe("ManagementAPI tests", () => {
  it("getTechnologies works properly", async () => {
    const technologiesList = [
      {
        id: 0,
        name: "JAVA",
        backgroundColor: "grey",
      },
    ];

    const axiosRes = {
      data: technologiesList,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };
    const mockGet = axios.get as jest.Mock;

    mockGet.mockResolvedValueOnce(axiosRes);
    const result = await getTechnologies();
    expect(
      result.data == technologiesList && result.status == 200
    ).toBeTruthy();
  });

  it("Should add new Technology in Technology table", async () => {
    const technologiesList = [
      {
        id: 0,
        name: "JAVA",
        backgroundColor: "grey",
      },
    ];

    const axiosRes = {
      data: technologiesList,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };
    const mockPost = axios.post as jest.Mock;

    mockPost.mockResolvedValueOnce(axiosRes);
    const result = await createTechnology(technologiesList[0]);
    expect(
      result.data == technologiesList && result.status == 200
    ).toBeTruthy();
  });

  it("Should  update Technology in Technology table", async () => {
    const technologiesList = [
      {
        id: 0,
        name: "JAVA",
        backgroundColor: "grey",
      },
    ];

    const axiosRes = {
      data: technologiesList,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };
    const mockPut = axios.put as jest.Mock;

    mockPut.mockResolvedValueOnce(axiosRes);
    const result = await updateTechnology(technologiesList[0]);
    expect(
      result.data == technologiesList && result.status == 200
    ).toBeTruthy();
  });

  it("getProjects works properly", async () => {
    const projectsList = [
      {
        id: 0,
        name: "Pixelgram",
        summary: "STRING",
        technology: {
          id: 1,
          name: "JavaScript",
          backgroundCOlor: "black",
        },
        repoLink: "REPO",
      },
    ];

    const axiosRes = {
      data: projectsList,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };
    const mockGet = axios.get as jest.Mock;

    mockGet.mockResolvedValueOnce(axiosRes);
    const result = await getProjects();
    expect(result.data == projectsList && result.status == 200).toBeTruthy();
  });

  it("Should updated exist project  in the Projects table", async () => {
    const projectsList = [
      {
        id: 20,
        name: "Pixelgram",
        summary: "STRING",
        technology: [
          {
            id: 1,
            name: "JavaScript",
            backgroundColor: "black",
          },
        ],
        repoLink: "REPO",
      },
    ];

    const axiosRes = {
      data: projectsList,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };

    const mockPut = axios.put as jest.Mock;

    mockPut.mockResolvedValueOnce(axiosRes);
    const result = await updateProject(projectsList[0]);
    expect(result.data == projectsList && result.status == 200).toBeTruthy();
  });

  it("Should add new project  in the Projects table", async () => {
    const projectsList = [
      {
        id: 20,
        name: "Pixelgram",
        summary: "STRING",
        technology: [
          {
            id: 1,
            name: "JavaScript",
            backgroundColor: "black",
          },
        ],
        repoLink: "REPO",
      },
    ];

    const axiosRes = {
      data: projectsList,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };

    const mockPost = axios.post as jest.Mock;

    mockPost.mockResolvedValueOnce(axiosRes);
    const result = await createProject(projectsList[0]);
    expect(result.data == projectsList && result.status == 200).toBeTruthy();
  });
});
