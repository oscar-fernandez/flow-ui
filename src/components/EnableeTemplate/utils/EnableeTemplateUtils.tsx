import IFEPod from "../../../models/interfaces/IFEPod";

export function containsPod(
  ar: IFEPod[],
  searchPodId: number | null
): IFEPod | undefined {
  return searchPodId
    ? ar.find((element) => element.id === searchPodId)
    : undefined;
}
