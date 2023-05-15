import { useEffect, useState } from "react";

import Header from "../components/common/Header";
import { ITodo } from "../types/common";
import InputTodo from "../components/todo/InputTodo";
import TodoList from "../components/todo/TodoList";
import { getTodoList } from "../api/todo";
import SearchList from "../components/search/SearchList";
import { styled } from "styled-components";

const Main = () => {
  const [todoListData, setTodoListData] = useState<ITodo[]>([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <div className="container">
      <div className="inner">
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
      </div>
    </div>
  );
};

const S = {
  DropDownContainer: styled.div`
    position: relative;
  `,
};

export default Main;
