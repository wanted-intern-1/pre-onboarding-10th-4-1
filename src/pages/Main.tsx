import { FormEvent, useEffect, useState } from 'react';
import { createTodo, getTodoList } from '../api/todo';

import Header from '../components/common/Header';
import { ITodo } from '../types/common';
import InputTodo from '../components/todo/InputTodo';
import SearchList from '../components/search/SearchList';
import TodoList from '../components/todo/TodoList';
import { styled } from 'styled-components';

const Main = () => {
  const [todoListData, setTodoListData] = useState<ITodo[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (inputText: string) => async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const trimmed = inputText.trim();
      if (!trimmed) {
        return alert('Please write something');
      }

      const newItem: Omit<ITodo, 'id'> = { title: trimmed };
      const { data } = await createTodo(newItem);

      if (data) {
        return setTodoListData((prev) => [...prev, data as ITodo]);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setInputText('');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <S.Container>
      <S.Wrap>
        <Header />
        <S.DropDownContainer>
          <InputTodo
            isLoading={isLoading}
            onSubmit={handleSubmit}
            inputText={inputText}
            setInputText={setInputText}
          />
          <SearchList onSubmit={handleSubmit} inputText={inputText} />
        </S.DropDownContainer>
        <TodoList todos={todoListData} setTodos={setTodoListData} />
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
