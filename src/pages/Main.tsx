import { useEffect, useState } from "react";

import Header from "../components/Header";
import { ITodo } from "../types/common";
import InputTodo from "../components/InputTodo";
import TodoList from "../components/TodoList";
import { getTodoList } from "../api/todo";
import styled from "styled-components";

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
    <S.Container>
      <S.Inner>
        <Header title="Toodos" />
        <InputTodo setTodos={setTodoListData} />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </S.Inner>
    </S.Container>
  );
};

export default Main;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
  `,
  Inner: styled.div`
    width: 100%;
    max-width: 364px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8rem 10px 4rem;
  `,
};
