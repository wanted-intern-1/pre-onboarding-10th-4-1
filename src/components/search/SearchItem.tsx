import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Highlighter from 'react-highlight-words';
import { theme } from '../../styles/theme';
import useHover from '../../hooks/useHover';
import { useInputContext } from '../../contexts/InputProvider';
import { useTodoListDispatchContext } from '../../contexts/TodoListProvider';
import { ITodo } from '../../types/common';

type Props = {
  id: number;
  listItem: string;
};

const SearchItem = ({ id, listItem }: Props) => {
  const { inputText, handleInputChange } = useInputContext();
  const [hoverRef, isHoverd] = useHover<HTMLLIElement>();
  const [clickId, setClickId] = useState(-1);
  const { onCreateTodo } = useTodoListDispatchContext();

  const handleTodoClick = async () => {
    setClickId(id);

    const newItem: Omit<ITodo, 'id'> = { title: listItem };
    await onCreateTodo(newItem);
    handleInputChange('');
  };

  useEffect(() => {
    setClickId(-1);
  }, [isHoverd]);

  return (
    <S.TodoLine ref={hoverRef} onClick={handleTodoClick}>
      <Highlighter
        highlightStyle={{
          color: theme.colors.green500,
          backgroundColor: 'transparent',
        }}
        searchWords={[inputText]}
        textToHighlight={listItem}
      >
        {listItem}
      </Highlighter>
      {isHoverd && clickId !== id ? <S.HoverNotice>hover</S.HoverNotice> : ''}
      {clickId === id ? <S.ClickNotice>click</S.ClickNotice> : ''}
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

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 10px;
    }
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
