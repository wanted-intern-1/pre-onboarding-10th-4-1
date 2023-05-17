import { useCallback, useEffect, useState } from "react";

import { styled } from "styled-components";
import { SearchAPI, TodoAPI } from "../api";
import { Header, InputTodo, TodoList } from "../components";
import SearchList from "../components/search/SearchList";
import { useDebounce, useQuery } from "../hooks";

const Main = () => {
  const [inputText, setInputText] = useState("");
  const debouncedInputText = useDebounce(inputText, 500);
  const { data: todos, refetch: refetchTodos } = useQuery(TodoAPI.get);

  const fetchSearchResults = useCallback(() => {
    return SearchAPI.get(debouncedInputText);
  }, [debouncedInputText]);
  const {
    data: searchResults,
    refetch: refetchSearch,
    hasNextPage,
  } = useQuery(debouncedInputText ? fetchSearchResults : null);

  useEffect(() => {
    if (debouncedInputText) {
      refetchSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputText]);

  return (
    <S.Container>
      <S.Wrap>
        <Header />
        <S.DropDownContainer>
          <InputTodo
            inputText={inputText}
            setInputText={setInputText}
            refetch={refetchTodos}
          />
          {debouncedInputText.length > 0 && (
            <SearchList
              inputText={debouncedInputText}
              searchResults={searchResults}
            />
          )}
        </S.DropDownContainer>
        <TodoList todos={todos} refetch={refetchTodos} />
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
