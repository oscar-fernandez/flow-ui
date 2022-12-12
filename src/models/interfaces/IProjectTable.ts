import ITechnology from "./ITechnology";

export default interface IProjectTable {
  [key: string]: any;
  id: number;
  name: string;
  summary: string;
  techStack: ITechnology[];
  repoLink: string;
}
