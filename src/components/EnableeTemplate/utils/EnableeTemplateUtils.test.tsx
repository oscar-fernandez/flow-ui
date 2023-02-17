import { describe, it, expect, beforeEach } from "vitest";
import { mockFePod } from "../../../data/MockFEPod";
import IFEPod from "../../../models/interfaces/IFEPod";
import { containsPod } from "./EnableeTemplateUtils";

const expectedPodList: IFEPod[] = [];
let expectedPodId: number;

beforeEach(() => {
  expectedPodList.push(mockFePod[0]);
  expectedPodId = mockFePod[0].id;
});

describe("EnableeTemplate Utils tests", () => {
  it("containsPod_Should_Return_Pod_When_Pod_In_Array", () => {
    const actualPod = containsPod(expectedPodList, expectedPodId);
    expect(actualPod).toEqual(expectedPodList[0]);
  });

  it("containsPod_Should_Return_Undefined_When_Pod_Not_In_Array", () => {
    expectedPodId = 4;
    const actualPod = containsPod(expectedPodList, expectedPodId);
    expect(actualPod).toBeUndefined();
  });

  it("containsPod_Should_Return_Undefined_When_PodArray_Is_Empty", () => {
    const actualPod = containsPod([], expectedPodId);
    expect(actualPod).toBeUndefined();
  });

  it("containsPod_Should_Return_Undefined_When_PodId_is_Null", () => {
    expect(containsPod(expectedPodList, null)).toBeUndefined();
  });
});
