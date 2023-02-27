import { describe, it, expect } from "vitest";
import EnableeTemplate from "../../EnableeTemplate/EnableeTemplate";
import { getEnableeTemplate } from "./Utils";

describe("", () => {
  it("should return Enablee Template", () => {
    expect(getEnableeTemplate()).toEqual(<EnableeTemplate />);
  });
});
