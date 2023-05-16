import TodoProvider from "../contexts/TodoContext";
import { TodoInputProvider } from "../contexts/TodoInputContext";

import Header from "../components/Header";
import InputTodo from "../components/InputTodo";
import TodoList from "../components/TodoList";

const Main = () => {
  return (
    <TodoProvider>
      <div className="container">
        <div className="inner">
          <Header />
          <TodoInputProvider>
            <InputTodo />
          </TodoInputProvider>
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
};

export default Main;
