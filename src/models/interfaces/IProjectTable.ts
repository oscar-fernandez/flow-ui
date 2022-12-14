import ITechnology from "./ITechnology";

export default interface IProjectTable {
  [key: string]: any;
  id: string;
  projectName: string;
  summary: string;
  techStack: ITechnology[];
  repoLink: string;
}
