import { ITodo } from "../types/common";
import apiRequest from "./index";

const RESOURCE = "/todos";

const getTodoList = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`);

    return response;
  } catch (error) {
    throw new Error("API getTodoList error");
  }
};

const createTodo = async (data: Omit<ITodo, "id">) => {
  try {
    const response = await apiRequest.post(`${RESOURCE}`, data);

    return response;
  } catch (error) {
    throw new Error("API createTodo error");
  }
};

const deleteTodo = async (id: string) => {
  try {
    const response = await apiRequest.delete(`${RESOURCE}/${id}`);

    return response;
  } catch (error) {
    throw new Error("API deleteTodo error");
  }
};

export const todoApi = {
  getTodoList,
  createTodo,
  deleteTodo,
};
