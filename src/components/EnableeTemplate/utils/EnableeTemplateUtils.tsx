import IFEPod from "../../../models/interfaces/IFEPod";

export function containsPod(
  ar: IFEPod[],
  searchPodId: number | null
): IFEPod | undefined {
  return searchPodId
    ? ar.find((element) => element.id === searchPodId)
    : undefined;
}

export function isInValidName(
  firstName: string | null | undefined,
  lastName: string | null | undefined
): boolean {
  const name = `${firstName} ${lastName}`;
  return (!firstName && !lastName) || name.trim().length === 0;
}

export function isValidDate(date: string | null): Date | null {
  if (date) {
    return new Date(date);
  }
  return null;
}
