import { useCallback, useState } from 'react';

import { FaTrash } from 'react-icons/fa';
import { ITodo } from '../../types/common';
import Spinner from '../common/Spinner';
import { deleteTodo } from '../../api/todo';
import styled from 'styled-components';

type Props = {
  id: string;
  title: string;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

const TodoItem = ({ id, title, setTodos }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteTodo(id);

      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [id, setTodos]);

  return (
    <S.Item>
      <span>{title}</span>
      <S.Option>
        {!isLoading ? (
          <S.Trash onClick={() => handleRemoveTodo()}>
            <FaTrash />
          </S.Trash>
        ) : (
          <Spinner isLoading={isLoading} />
        )}
      </S.Option>
    </S.Item>
  );
};

const S = {
  Item: styled.li`
    list-style-type: none;
    padding: 17px 1.5rem;
    border-bottom: 1px solid #eaeaea;
    font-size: 1.2rem;
    letter-spacing: 1.5px;
    &:hover {
      opacity: 0.85;
      background-color: #eaeaea;
    }
  `,
  Option: styled.div`
    float: right;
    .button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  `,
  Trash: styled.button`
    color: orangered;
    font-size: 16px;
    background: none;
  `,
};

export default TodoItem;
