import TodoProvider, { TodoContext } from "../contexts/TodoContext";

import Btn from "../components/common/Btn";
import Header from "../components/Header";
import InputTodo from "../components/InputTodo";
import TodoList from "../components/TodoList";
import { styled } from "styled-components";
import { useContext } from "react";

const Main = () => {
  const { todos } = useContext(TodoContext);

  return (
    <TodoProvider>
      <div className="container">
        <S.inner>
          <Header />
          <InputTodo />
          {todos ? <TodoList /> : <Btn icon="spinner" />}
        </S.inner>
      </div>
    </TodoProvider>
  );
};

const S = {
  inner: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  `,
};

export default Main;
