import { Children, FormEvent } from 'react';

import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

type Props = {
  todo: string;
  inputText: string;
  onSubmit: (e: FormEvent<Element>) => Promise<void>;
};

const SearchItem = ({ onSubmit, todo, inputText }: Props) => {
  const highlight = (text: string, inputText: string) => {
    const parts = text.split(new RegExp(`(${inputText})`, 'gi'));
    return (
      <S.TodoLineCont>
        {Children.toArray(
          parts.map((part) =>
            part.toLowerCase() === inputText.toLowerCase() ? (
              <S.Highlight>{part}</S.Highlight>
            ) : (
              part
            )
          )
        )}
      </S.TodoLineCont>
    );
  };

  return (
    <S.TodoLine onClick={onSubmit}>{highlight(todo, inputText)}</S.TodoLine>
  );
};

const S = {
  TodoLine: styled.li`
    padding: 6px 12px;
    cursor: pointer;
    &:hover {
      background-color: ${theme.colors.neutral100};
      border-radius: 3px;
    }
    &:active {
      background-color: ${theme.colors.green100};
      border-radius: 3px;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  TodoLineCont: styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  Highlight: styled.span`
    color: ${theme.colors.green500};
  `,
};

export default SearchItem;
