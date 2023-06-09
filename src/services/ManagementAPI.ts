import ITechnology from "../models/interfaces/ITechnology";
import IProject from "../models/interfaces/IProject";
import { get, post, put } from "./API";

const baseUrl = `${process.env.VITE_ENABLEMENT_FEMS}/mgt`;

function getTechnologies() {
  return get(baseUrl + "/technologies");
}

function updateTechnology(technology: ITechnology) {
  return put(baseUrl + "/technology", technology);
}

function createTechnology(technology: ITechnology) {
  return post(baseUrl + "/technology", technology);
}

function getProjects() {
  return get(baseUrl + "/projects");
}

function createProject(project: IProject) {
  return post(baseUrl + "/project", project);
}

function updateProject(project: IProject) {
  return put(baseUrl + "/project", project);
}

export {
  getTechnologies,
  updateTechnology,
  createTechnology,
  getProjects,
  updateProject,
  createProject,
};
