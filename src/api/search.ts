import { DataResult } from "../types/common";
import apiRequest from "./client";

const RESOURCE = "/search";

interface SearchResponse {
  opcode: number;
  message: string;
  result: string[];
  total: number;
  page: number;
  limit: number;
  qty: number;
}

const get = async (q: string, page = 1, limit = 10): Promise<DataResult> => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`, {
      params: { q, page, limit },
    });

    const responseData = response.data as SearchResponse;

    return {
      result: responseData.result,
      total: responseData.total,
    };
  } catch (error) {
    throw new Error("API get error");
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { get };
