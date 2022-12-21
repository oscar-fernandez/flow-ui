import ITechnology from "./ITechnology";

interface IProject {
  id: number;
  name: string;
  summary: string;
  technology: ITechnology[];
  repoLink: string;
}

export default IProject;
