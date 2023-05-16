import { useCallback, useEffect } from 'react';

import Header from '../components/common/Header';
import { ITodo } from '../types/common';
import InputTodo from '../components/todo/InputTodo';
import TodoList from '../components/todo/TodoList';
import { createTodo, deleteTodo, getTodoList } from '../api/todo';
import SearchList from '../components/search/SearchList';
import { styled } from 'styled-components';
import { useInputContext } from '../contexts/InputProvider';
import TodoListProvider from '../contexts/TodoListProvider';
import useAsync from '../hooks/useAsync';

const Main = () => {
  const { inputText } = useInputContext();
  const { value, callback } = useAsync({
    fn: getTodoList,
    deps: [],
  });

  useEffect(() => {
    callback();
  }, [callback]);

  const handleCreateTodo = useCallback(async (newTodo: Omit<ITodo, 'id'>) => {
    return await createTodo(newTodo);
  }, []);

  const handleDeleteTodo = useCallback(async (id: string) => {
    return await deleteTodo(id);
  }, []);

  return (
    <S.Container>
      <S.Wrap>
        <Header />
        <TodoListProvider
          initialState={value || []}
          handleCreateTodo={handleCreateTodo}
          handleDeleteTodo={handleDeleteTodo}
        >
          <S.DropDownContainer>
            <InputTodo />
            {inputText.length > 0 && <SearchList />}
          </S.DropDownContainer>
          <TodoList />
        </TodoListProvider>
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
