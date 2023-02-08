import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { GetPaginatedEnablees } from "../../../services/EnableeAPI";
import EnableeView from "./EnableeView";
import { dummyEnablees } from "../../../data/EnableeMock";
import IEnablee from "../../../models/interfaces/IEnablee";

// Don't need to render carousel, its already in the Enablee View
// Mock the api call
// Call the buttons in carousel to test the set, and make sure buttons change active number displayed in carousel, and form input displayed in carousel
// Makes sure it maps enablees? or maybe test this in Enablee View.
vi.mock("../../../services/EnableeAPI");
const mockGetPaginatedEnablees = GetPaginatedEnablees as jest.Mock;

let expectedEnablees: { data: IEnablee[] };

beforeAll(() => {
  mockGetPaginatedEnablees.mockRestore();
  expectedEnablees = {
    data: dummyEnablees,
  };
});

describe("Tests for EnableeView: ", () => {
  describe("getEnablees tests", () => {
    it("Should return enablees", async () => {
      mockGetPaginatedEnablees.mockResolvedValueOnce(expectedEnablees);
      const actualEnablees = await GetPaginatedEnablees(1);
      expect(actualEnablees.data).toEqual(expectedEnablees.data);
    });
  });
});