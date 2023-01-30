import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import {
  getPendingPods,
  getCompletedPods,
  getActivePods,
  getAvailablePods,
  getPods,
  createPod,
  updatePod,
} from "./PodAPI";

import { mockFePod } from "../data/MockFEPod";
import IFEPod from "../models/interfaces/IFEPod";

const baseUrl: string = `${process.env.VITE_ENABLEMENT_FEMS}/pod` || "";

vi.mock("axios");
const mockGet = axios.get as jest.Mock;
const mockPost = axios.post as jest.Mock;
const mockPut = axios.put as jest.Mock;

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
  describe("getActivePods tests", () => {
    it("Should return active pods", async () => {
      mockGet.mockResolvedValueOnce(expectedFePod);
      const actualFePod = await getActivePods();
      expect(actualFePod.data).toEqual(expectedFePod.data);
    });

    it("Should call /pod/active endpoint and call endpoint single time", async () => {
      mockGet.mockResolvedValueOnce(expectedFePod);
      await getActivePods();
      expect(mockGet).toHaveBeenCalledOnce();
      expect(mockGet).toHaveBeenCalledWith(`${baseUrl}/active`, {
        params: {},
      });
    });

    it("Should return empty array if no active pods", async () => {
      mockGet.mockResolvedValueOnce({ data: [] });
      const actualFePod = await getActivePods();
      expect(actualFePod.data).toEqual([]);
    });
  });

  describe("getAvailablePods tests", () => {
    it("Should return available pods", async () => {
      mockGet.mockResolvedValueOnce(expectedFePod);
      const actualFePod = await getAvailablePods();
      expect(actualFePod.data).toEqual(expectedFePod.data);
    });

    it("Should call /pod endpoint and call endpoint single time", async () => {
      mockGet.mockResolvedValueOnce(expectedFePod);
      await getAvailablePods();
      expect(mockGet).toHaveBeenCalledOnce();
      expect(mockGet).toHaveBeenCalledWith(`${baseUrl}/available`, {
        params: {},
      });
    });
  });

  describe("getPods tests", () => {
    it("Should return pods", async () => {
      mockGet.mockResolvedValueOnce(expectedFePod);
      const actualFePod = await getPods(1);
      expect(actualFePod.data).toEqual(expectedFePod.data);
    });

    it("Should call /pod endpoint and call endpoint single time", async () => {
      mockGet.mockResolvedValueOnce(expectedFePod);
      await getPods(1);
      expect(mockGet).toHaveBeenCalledWith(`${baseUrl}?page=1`, {
        params: {},
      });
    });
  });

  describe("createPod tests", () => {
    it("Should create pod", async () => {
      mockPost.mockResolvedValueOnce(expectedFePod);
      const actualFePod = await createPod(mockFePod[0]);
      expect(actualFePod.data).toEqual(expectedFePod.data);
    });
  });

  describe("updatePod tests", () => {
    it("Should update pod", async () => {
      mockPut.mockResolvedValueOnce(expectedFePod);
      const actualFePod = await updatePod(mockFePod[0]);
      expect(actualFePod.data).toEqual(expectedFePod.data);
    });
  });
});
