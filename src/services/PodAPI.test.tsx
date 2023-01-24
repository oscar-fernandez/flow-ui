import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getPendingPods, getCompletedPods } from "./PodAPI";
import { mockFePod } from "../data/MockFEPod";
import IFEPod from "../models/interfaces/IFEPod";

const baseUrl: string = `${process.env.VITE_ENABLEMENT_FEMS}/pod` || "";

vi.mock("axios");
const mockGet = axios.get as jest.Mock;
let expectedFePod: { data: IFEPod[] };

beforeEach(() => {
  mockGet.mockRestore();
  expectedFePod = {
    data: mockFePod,
  };
});

describe("Tests for PodAPI: ", () => {
  describe("getPendingPods tests", () => {
    it("Should return completed pods", async () => {
      mockGet.mockResolvedValueOnce(expectedFePod);
      const actualFePod = await getCompletedPods();
      expect(actualFePod.data).toEqual(expectedFePod.data);
    });

    it("Should call /pod/completed endpoint and call endpoint single time", async () => {
      mockGet.mockResolvedValueOnce(expectedFePod);
      await getCompletedPods();
      expect(mockGet).toHaveBeenCalledOnce();
      expect(mockGet).toHaveBeenCalledWith(`${baseUrl}/completed`, {
        params: {},
      });
    });
  });

  describe("getCompletedPods tests", () => {
    it("Should return pending pods", async () => {
      mockGet.mockResolvedValueOnce(expectedFePod);
      const actualFePod = await getPendingPods();
      expect(actualFePod.data).toEqual(expectedFePod.data);
    });

    it("Should call /pod/pending endpoint and call endpoint single time", async () => {
      mockGet.mockResolvedValueOnce(expectedFePod);
      await getPendingPods();
      expect(mockGet).toHaveBeenCalledOnce();
      expect(mockGet).toHaveBeenCalledWith(`${baseUrl}/pending`, {
        params: {},
      });
    });
  });
});
