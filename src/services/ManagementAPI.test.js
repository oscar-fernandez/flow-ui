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
      },
    ];

    const axiosRes = {
      data: technologiesList,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };

    axios.get.mockResolvedValueOnce(axiosRes);
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
      },
    ];

    const axiosRes = {
      data: technologiesList,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };
    axios.post.mockResolvedValueOnce(axiosRes);
    const result = await createTechnology();
    expect(
      result.data == technologiesList && result.status == 200
    ).toBeTruthy();
  });

  it("Should  update Technology in Technology table", async () => {
    const technologiesList = [
      {
        id: 0,
        name: "JAVA",
      },
    ];

    const axiosRes = {
      data: technologiesList,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };

    axios.put.mockResolvedValueOnce(axiosRes);
    const result = await updateTechnology();
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

    axios.get.mockResolvedValueOnce(axiosRes);
    const result = await getProjects();
    expect(result.data == projectsList && result.status == 200).toBeTruthy();
  });

  it("Should updated exist project  in the Projects table", async () => {
    const projectsList = [
      {
        id: 20,
        name: "Pixelgram",
        summary: "STRING",
        technology: {
          id: 1,
          name: "JavaScript",
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

    axios.put.mockResolvedValueOnce(axiosRes);
    const result = await updateProject();
    expect(result.data == projectsList && result.status == 200).toBeTruthy();
  });

  it("Should add new project  in the Projects table", async () => {
    const projectsList = [
      {
        id: 20,
        name: "Pixelgram",
        summary: "STRING",
        technology: {
          id: 1,
          name: "JavaScript",
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

    axios.post.mockResolvedValueOnce(axiosRes);
    const result = await createProject();
    expect(result.data == projectsList && result.status == 200).toBeTruthy();
  });
});
