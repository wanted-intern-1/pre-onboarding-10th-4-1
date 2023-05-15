import React from "react";
import { ITodo } from "../../types/common";
import { styled } from "styled-components";
import Highlighter from "react-highlight-words";
import { theme } from "../../styles/theme";

type Props = {
  todo: ITodo;
  inputText: string;
};

const SearchItem = ({ todo, inputText }: Props) => {
  return (
    <S.TodoLine>
      <Highlighter
        highlightStyle={{
          color: theme.colors.green500,
          backgroundColor: "transparent",
        }}
        searchWords={[inputText]}
        textToHighlight={todo.title}
      >
        {todo.title}
      </Highlighter>
    </S.TodoLine>
  );
};

const S = {
  TodoLine: styled.li`
    padding: 6px 12px;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral100};
      border-radius: 3px;
    }
  `,
};

export default SearchItem;
