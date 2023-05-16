import { useEffect, useState } from "react";

import { ITodo } from "../types/common";
import { TodoAPI } from "../api";
import { Header, InputTodo, TodoList } from "../components";

const Main = () => {
  const [todoListData, setTodoListData] = useState<ITodo[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await TodoAPI.get();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo setTodos={setTodoListData} />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
