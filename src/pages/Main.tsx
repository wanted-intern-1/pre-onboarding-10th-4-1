import { useEffect, useState } from "react";

import Header from "../components/common/Header";
import { IRequest, ITodo } from "../types/common";
import InputTodo from "../components/todo/InputTodo";
import TodoList from "../components/todo/TodoList";
import { getTodoList } from "../api/todo";
import SearchList from "../components/search/SearchList";
import { styled } from "styled-components";
import useDebounce from "../hooks/useDebounce";

const Main = () => {
  const [todoListData, setTodoListData] = useState<ITodo[]>([]);
  const [inputText, setInputText] = useState("");
  const [debounceValue, setDebounceValue] = useState<string>("");

  useDebounce(() => setDebounceValue(inputText), 500);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
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
            <SearchList inputText={inputText} debounceValue={debounceValue} />
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
