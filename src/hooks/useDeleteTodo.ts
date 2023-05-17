import { ITodo } from "../types/common";
import { deleteTodo } from "../api/todo";
import { useCallback, useState } from "react";

export const useDeleteTodo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteTodo = useCallback(
    async (
      id: string,
      setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>
    ) => {
      try {
        setIsLoading(true);
        await deleteTodo(id);
        setIsLoading(false);
        setTodos((prev) => prev.filter((item) => item.id !== id));
      } catch (error: any) {
        console.error(error);
        alert("Something went wrong.");
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, handleDeleteTodo };
};
