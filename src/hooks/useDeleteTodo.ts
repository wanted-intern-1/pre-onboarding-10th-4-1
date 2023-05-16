import { useState, useCallback, useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

export const useDeleteTodo = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteTodoItem } = useContext(TodoContext);
  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteTodoItem(id);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [id, setIsLoading, deleteTodoItem]);
  return { isLoading, handleRemoveTodo };
};
