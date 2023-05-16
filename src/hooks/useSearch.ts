import React, { useContext, useEffect, useState } from "react";
import { searchTodo } from "../api/todo";
import { ITodo } from "../types/common";
import { TodoActionContex } from "../context/TodoActionContext";
import { TodoInputContext } from "../context/TodoInputContext";

type Props = {
  inputText: string;
  start: number;
  limit: number;
};

const useSearch = ({ inputText, start, limit }: Props) => {
  const [data, setData] = useState<Array<string>>([]);
  const [total, setTotal] = useState(0);
  const { isLoading, setIsLoading } = useContext(TodoActionContex);

  useEffect(() => {
    const fetchSearchTodo = async () => {
      if (isLoading || !inputText) return;
      try {
        setIsLoading(true);
        const response = await searchTodo(inputText, start, limit);
        setData(response.data.result);
        setTotal(response.data.total);
      } catch (error) {
        console.error("API searchTodo API error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchTodo();
  }, [inputText, start, limit]);

  return {
    data,
    total,
  };
};

export default useSearch;
