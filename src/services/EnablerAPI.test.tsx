import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { getAllEnablers } from "./EnablerAPI";
import { mockEnabler } from "../data/MockEnabler";

vi.mock("axios");
const mockGet = axios.get as jest.Mock;

const expectedData = { data: mockEnabler };

describe("EnablerAPI", () => {
  it("Should return all enablers", async () => {
    mockGet.mockResolvedValue(expectedData);
    const res = await getAllEnablers();
    expect(res.data).toEqual(expectedData.data);
  });
});
