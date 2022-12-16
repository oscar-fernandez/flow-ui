import axios from "axios";
import ITechnology from "../models/interfaces/ITechnology";
import IProject from "../models/interfaces/IProject";

const baseUrl: string = `${import.meta.env.VITE_ENABLEMENT_FEMS}/mgt` || "";

function getTechnologies() {
  return axios.get(`${baseUrl}/technologies`);
}

function updateTechnology(technology: ITechnology) {
  return axios.patch(`${baseUrl}/technology`, technology);
}

function createTechnology(technology: ITechnology) {
  return axios.post(`${baseUrl}/technology`, technology);
}

function getProjects() {
  return axios.get(`${baseUrl}/projects`);
}

function createProject(project: IProject) {
  return axios.post(`${baseUrl}/project`, project);
}

function updateProject(project: IProject) {
  return axios.patch(`${baseUrl}/project`, project);
}

export {
  getTechnologies,
  updateTechnology,
  createTechnology,
  getProjects,
  updateProject,
  createProject,
};
