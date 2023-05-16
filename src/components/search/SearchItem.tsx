import Highlighter from "react-highlight-words";
import { styled } from "styled-components";
import { theme } from "../../styles/theme";

type Props = {
  search: string;
  inputText: string;
};

const SearchItem = ({ search, inputText }: Props) => {
  return (
    <S.TodoLine onClick={() => {}}>
      <Highlighter
        highlightStyle={{
          color: theme.colors.green500,
          backgroundColor: "transparent",
        }}
        searchWords={[inputText]}
        textToHighlight={search}
      >
        {search}
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
