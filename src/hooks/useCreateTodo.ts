import { ITodo } from "../types/common";
import { createTodo } from "../api/todo";
import { useCallback, useState } from "react";

export const useCreateTodo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTodo = useCallback(
    async (
      item: string,
      setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>
    ) => {
      try {
        setIsLoading(true);
        const newItem: Omit<ITodo, "id"> = { title: item };
        const { data } = await createTodo(newItem);
        setIsLoading(false);
        if (data) setTodos((prev) => [...prev, data as ITodo]);
      } catch (err: any) {
        console.error(err);
        alert("Something went wrong.");
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, handleCreateTodo };
};
