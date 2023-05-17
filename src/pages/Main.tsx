import { useEffect, useState } from "react";

import { ITodo } from "../types/common";
import { TodoAPI } from "../api";
import { Header, InputTodo, TodoList } from "../components";
import SearchList from "../components/search/SearchList";
import { styled } from "styled-components";

const Main = () => {
  const [todoListData, setTodoListData] = useState<ITodo[]>([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await TodoAPI.get();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <S.Container>
      <S.Wrap>
        <Header />
        <S.DropDownContainer>
          <InputTodo
            inputText={inputText}
            setInputText={setInputText}
            setTodos={setTodoListData}
          />
          {inputText.length > 0 && (
            <SearchList inputText={inputText} todos={todoListData} />
          )}
        </S.DropDownContainer>
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </S.Wrap>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
  `,
  Wrap: styled.div`
    width: 100%;
    padding: 8rem 10px 4rem;
  `,
  DropDownContainer: styled.div`
    position: relative;
  `,
};

export default Main;
