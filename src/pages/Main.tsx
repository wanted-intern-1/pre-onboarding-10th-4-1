import TodoProvider, { TodoContext } from "../contexts/TodoContext";

import Btn from "../components/common/Btn";
import Header from "../components/Header";
import InputTodo from "../components/InputTodo";
import TodoList from "../components/TodoList";
import { useContext } from "react";

const Main = () => {
  const { todos } = useContext(TodoContext);

  return (
    <TodoProvider>
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo />
          {todos ? <TodoList /> : <Btn icon="spinner" />}
        </div>
      </div>
    </TodoProvider>
  );
};

export default Main;
