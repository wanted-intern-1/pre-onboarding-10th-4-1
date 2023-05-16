import React from 'react';
import { styled } from 'styled-components';
import SearchItem from './SearchItem';
import { useInputContext } from '../../contexts/InputProvider';
import { useTodoListContext } from '../../contexts/TodoListProvider';

const SearchList = () => {
  const { inputText } = useInputContext();
  const { todos } = useTodoListContext();

  const filterKeywordTodos = todos.filter((todo) => todo.title.includes(inputText));
  return (
    <S.Container>
      {filterKeywordTodos && (
        <ul>
          {filterKeywordTodos.map((todo) => {
            return <SearchItem key={todo.id} todo={todo} inputText={inputText} />;
          })}
        </ul>
      )}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    border: 1px solid ${({ theme }) => theme.colors.neutral300};
    width: 364px;
    height: 164px;
    max-height: 164px;
    overflow-y: auto;
    margin: 0 auto;
    border-radius: 5px;
    padding: 9px 5px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 110%;
    background-color: #fff;
    z-index: 999;
  `,
};

export default SearchList;
