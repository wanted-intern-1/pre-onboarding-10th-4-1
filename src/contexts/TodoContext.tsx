import React, { createContext, useEffect, useState } from "react";

import { ITodo } from "../types/common";
import { getTodoList, createTodo, deleteTodo } from "../api/todo";

interface ITodoContext {
  todos: ITodo[];
  createTodoItem: (inputText: string) => Promise<void>;
  deleteTodoItem: (id: string) => Promise<void>;
  isLoading: boolean;
}

export const TodoContext = createContext<ITodoContext>({
  todos: [],
  createTodoItem: async () => {},
  deleteTodoItem: async () => {},
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
        const { data } = await getTodoList();
        setTodos(data || []);
      })();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTodoItem = async (inputText: string) => {
    try {
      setIsLoading(true);
      const trimmed = inputText.trim();
      if (!trimmed) {
        return alert("Please write something");
      }

      const newItem: Omit<ITodo, "id"> = { title: trimmed };
      const { data } = await createTodo(newItem);

      setTodos((prev) => [...prev, data]);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodoItem = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, createTodoItem, deleteTodoItem, isLoading }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export default TodoProvider;
