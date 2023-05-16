import { createTodo, getTodoList } from "../api/todo";
import { useCallback, useEffect, useState } from "react";

import Header from "../components/common/Header";
import { ITodo } from "../types/common";
import InputTodo from "../components/todo/InputTodo";
import SearchList from "../components/search/SearchList";
import TodoList from "../components/todo/TodoList";
import { styled } from "styled-components";

const Main = () => {
  const [todoListData, setTodoListData] = useState<ITodo[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  const handleSubmit = useCallback(
    async (inputText: string) => {
      try {
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert("Please write something");
        }

        const newItem: Omit<ITodo, "id"> = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodoListData((prev) => [...prev, data as ITodo]);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setInputText("");
        setIsLoading(false);
      }
    },
    [setTodoListData]
  );

  return (
    <S.Container>
      <S.Wrap>
        <Header />
        <S.DropDownContainer>
          <InputTodo
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            inputText={inputText}
            setInputText={setInputText}
            setTodos={setTodoListData}
            onSubmit={(e) => handleSubmit(inputText)}
          />
          <SearchList
            inputText={inputText}
            setIsLoading={setIsLoading}
            onClick={handleSubmit}
          />
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
