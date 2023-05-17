import React from "react";
import Highlighter from "react-highlight-words";
import { theme } from "../../styles/theme";
import { styled } from "styled-components";

type Props = {
  searchItem: string;
  inputText: string;
  onClick: (e: React.MouseEvent) => void;
};

const SearchItem = ({ searchItem, inputText, onClick }: Props) => {
  return (
    <S.TodoLine onClick={onClick}>
      <Highlighter
        highlightStyle={{
          color: theme.colors.green500,
          backgroundColor: "transparent",
        }}
        searchWords={[inputText]}
        textToHighlight={searchItem}
      >
        {searchItem}
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
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
};

export default SearchItem;
