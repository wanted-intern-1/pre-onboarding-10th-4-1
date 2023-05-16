import { ITodo } from "../types/common";
import apiRequest from "./index";

const RESOURCE = "/todos";

export const getTodoList = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`);

    return response;
  } catch (error) {
    throw new Error("API getTodoList error");
  }
};

export const createTodo = async (data: Omit<ITodo, "id">) => {
  try {
    const response = await apiRequest.post(`${RESOURCE}`, data);

    return response;
  } catch (error) {
    throw new Error("API createTodo error");
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await apiRequest.delete(`${RESOURCE}/${id}`);

    return response;
  } catch (error) {
    throw new Error("API deleteTodo error");
  }
};

export const searchTodo = async (
  inputText: string,
  start: number,
  limit: number
) => {
  try {
    const response = await apiRequest.get(
      `/search?q=${inputText}&page=${start}&limit=${limit}`
    );

    return response;
  } catch (e) {
    throw new Error("API searchTodo error");
  }
};
