import React, { createContext, useEffect, useState } from "react";

import { ITodo } from "../types/common";
import { todoApi } from "../api/todo";

type ITodoContext = {
  todos: ITodo[];
  createTodo: (inputText: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  isLoading: boolean;
};

export const TodoContext = createContext<ITodoContext>({
  todos: [],
  createTodo: async () => {},
  deleteTodo: async () => {},
  isLoading: false,
});

type Props = {
  children: React.ReactNode;
};

const TodoProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      (async () => {
        const { data } = await todoApi.getTodoList();
        setTodos(data || []);
      })();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTodo = async (inputText: string) => {
    try {
      setIsLoading(true);

      const trimmed = inputText.trim();
      if (!trimmed) {
        return alert("Please write something");
      }

      const newItem: Omit<ITodo, "id"> = { title: trimmed };
      const { data } = await todoApi.createTodo(newItem);
      setTodos((prev) => [...prev, data]);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <TodoContext.Provider value={{ todos, createTodo, deleteTodo, isLoading }}>
      {children}
    </TodoContext.Provider>
  );
};
export default TodoProvider;
