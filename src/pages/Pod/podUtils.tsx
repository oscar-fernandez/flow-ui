/** [X] will be used by nested route pendingPodAssignment
 * [ ] props are fn for custom hook for enablee, fn for custom hook pods
 * [ ] contains internal state of filtered items
 * [X] Uses customTableContainer for enablee info, and one for Pod
 * [X] create helper functions and put in separate utils file
 * [] You select a Pod, it filters the enablees. Use utility function for client side filtering. Depends on #120
 * [X] If check mark for contains / match techstack, then pod ts must contain/ match enablee’s ts in addition to the date.
 * [ ] Submit button shou ld be disabled, it becomes enabled once at least one pod and one enablee are selected.
 * [ ] When this submit, this should update the page by removing that enablee from the enablee pending pod assignment table
 * [ ] alert is displayed under the pod table if you selected the max capacity, you should not be able to select any more enablees from the table unless you unselect. When unselecting, this should remove the alert.
 * ![image](/uploads/c520a78d68a68d35d322bcf38c5ff604/image.png)
 * [ ] if pod is all filled, it can also be removed from the list of available pods */

import IPod from "../../models/interfaces/IPod";
import { convertTechArToStr } from "../Management/mgtUtils";
import IEnablee from "../../models/interfaces/IEnablee";
import * as Fun from "../Enablee/PodAssignment/PodAssignment";
import { mockPods } from "../../data/PodMock";
import { dummyEnablees } from "../../data/EnableeMock";

const listCheckboxes = [
  { name: "Match Tech Stack" },
  { name: "Contains Tech Stack" },
  { name: "Available Enablees" },
];

const podRowFactory = (obj: IPod, totalCapacity: number): string[] => {
  return [
    obj.project.name,
    obj.podName,
    convertTechArToStr(obj.project.technology),
    obj.podStartDate,
    obj.podEndDate,
    capasityEmployee(obj.enableeEmployee, totalCapacity),
  ];
};
const transformPodArray = (ar: IPod[], totalCapacity: number): string[][] =>
  ar.map((e) => podRowFactory(e, totalCapacity));

const ARGUMENT = 5;

const capasityEmployee = (ar: IEnablee[], totalCapacity: number) =>
  `${ar.length.toString()} / ${totalCapacity}`;

const eqSet = (xs, ys) =>
  xs.size === ys.size && [...xs].every((x) => ys.has(x));

const matchAllSkills = (ar: IEnablee[], obj: IPod) =>
  ar.filter((e) => {
    return eqSet(
      new Set(e.technology.map((t) => t.name)),
      new Set(obj.project.technology.map((t) => t.name))
    );
  });

const includeSet = (xs, ys) => [...xs].some((x) => ys.has(x));

const matchSomeSkills = (ar: IEnablee[], obj: IPod) =>
  ar.filter((e) => {
    return includeSet(
      new Set(e.technology.map((t) => t.name)),
      new Set(obj.project.technology.map((t) => t.name))
    );
  });

export {
  transformPodArray,
  matchAllSkills,
  matchSomeSkills,
  listCheckboxes,
  capasityEmployee,
};
