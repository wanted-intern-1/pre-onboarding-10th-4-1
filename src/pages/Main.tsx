import { useState } from "react";

import { styled } from "styled-components";
import { TodoAPI } from "../api";
import { Header, InputTodo, TodoList } from "../components";
import SearchList from "../components/search/SearchList";
import { useQuery } from "../hooks";

const Main = () => {
  const [inputText, setInputText] = useState("");
  const { data: todos, refetch } = useQuery(TodoAPI.get);

  return (
    <S.Container>
      <S.Wrap>
        <Header />
        <S.DropDownContainer>
          <InputTodo
            inputText={inputText}
            setInputText={setInputText}
            refetch={refetch}
          />
          {inputText.length > 0 && (
            <SearchList inputText={inputText} todos={todos} />
          )}
        </S.DropDownContainer>
        <TodoList todos={todos} refetch={refetch} />
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
