import { styled } from "styled-components";
import { theme } from "../../styles/theme";

type Props = {
  search: string;
  inputText: string;
  onClick: (inputText: string) => Promise<void>;
};

const SearchItem = ({ search, inputText, onClick }: Props) => {
  const highlight = (text: string, inputText: string) => {
    const parts = text.split(new RegExp(`(${inputText})`, "gi"));
    return (
      <span>
        {parts.map((part) =>
          part.toLowerCase() === inputText.toLowerCase() ? (
            <S.Highlight>{part}</S.Highlight>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <S.TodoLine onClick={() => onClick(search)}>
      {highlight(search, inputText)}
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
  Highlight: styled.span`
    color: ${theme.colors.green500};
  `,
};

export default SearchItem;
