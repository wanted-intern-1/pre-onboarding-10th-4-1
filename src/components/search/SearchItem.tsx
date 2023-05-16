import React, { useContext } from "react";
import { styled } from "styled-components";
import Highlighter from "react-highlight-words";
import { theme } from "../../styles/theme";
import { TodoInputContext } from "../../context/TodoInputContext";

type Props = {
  todo: string;
};

const SearchItem = ({ todo }: Props) => {
  const { inputText } = useContext(TodoInputContext);
  return (
    <S.TodoLine>
      <Highlighter
        highlightStyle={{
          color: theme.colors.green500,
          backgroundColor: "transparent",
        }}
        searchWords={[inputText]}
        textToHighlight={todo}
      >
        {todo}
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
    &:active {
      background-color: ${({ theme }) => theme.colors.green100};
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  HoverNotice: styled.div`
    color: #3211ff;
    font-size: 8px;
  `,
  ClickNotice: styled.div`
    color: #ff112e;
    font-size: 8px;
  `,
};

export default SearchItem;
