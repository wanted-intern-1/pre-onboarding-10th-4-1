import { ITodo } from "../types/common";
import apiRequest from "./client";

const RESOURCE = "/todos";

const get = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`);

    return response;
  } catch (error) {
    throw new Error("API get error");
  }
};

const create = async (data: Omit<ITodo, "id">) => {
  try {
    const response = await apiRequest.post(`${RESOURCE}`, data);

    return response;
  } catch (error) {
    throw new Error("API create error");
  }
};

const remove = async (id: string) => {
  try {
    const response = await apiRequest.delete(`${RESOURCE}/${id}`);

    return response;
  } catch (error) {
    throw new Error("API remove error");
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get,
  create,
  remove,
};
