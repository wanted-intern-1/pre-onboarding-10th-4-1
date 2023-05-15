import { useEffect, useState } from "react";

import Header from "../components/Header";
import { ITodo } from "../types/common";
import InputTodo from "../components/InputTodo";
import TodoList from "../components/TodoList";
import { getTodoList } from "../api/todo";

const Main = () => {
  const [todoListData, setTodoListData] = useState<ITodo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTodoList();
        setTodoListData(data);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.error(errorMessage);

        setTodoListData([]);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header title="Toodos" />
        <InputTodo setTodos={setTodoListData} />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
