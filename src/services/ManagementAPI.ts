import ITechnology from "../models/interfaces/ITechnology";
import IProject from "../models/interfaces/IProject";
import { mgtGet, mgtPost, mgtPut } from "../services/FacadePattern";

const baseUrl: string = `${import.meta.env.VITE_ENABLEMENT_FEMS}/mgt` || "";

function getTechnologies() {
  return mgtGet(`${baseUrl}/technologies`);
}

function updateTechnology(technology: ITechnology) {
  return mgtPut(`${baseUrl}/technology`, { technology: `${technology}` });
}

function createTechnology(technology: ITechnology) {
  return mgtPost(`${baseUrl}/technology`, { technology: `${technology}` });
}

function getProjects() {
  return mgtGet(`${baseUrl}/projects`);
}

function createProject(project: IProject) {
  return mgtPost(`${baseUrl}/project`, project);
}

function updateProject(project: IProject) {
  return mgtPut(`${baseUrl}/project`, project);
}

export {
  getTechnologies,
  updateTechnology,
  createTechnology,
  getProjects,
  updateProject,
  createProject,
};
