import { FaSpinner, FaTrash } from "react-icons/fa";

import { ITodo } from "../types/common";
import { deleteTodo } from "../api/todo";
import useAsync from "../hooks/useAsync";
import styled from "styled-components";
import { useEffect } from "react";

type Props = {
  id: string;
  title: string;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

const TodoItem = ({ id, title, setTodos }: Props) => {
  let isComponentMounted = true;

  const { isLoading, callback } = useAsync({
    fn: async () => {
      await deleteTodo(id);

      /*
        Error: Warning: Can't perform a React state update on an unmounted component.
      */
      if (isComponentMounted)
        setTodos((prev) => prev.filter((item) => item.id !== id));
    },
    deps: [id, setTodos],
  });

  useEffect(() => {
    return () => {
      isComponentMounted = false;
    };
  }, []);

  return (
    <S.Item>
      <span>{title}</span>
      <S.ItemOptionDiv>
        {!isLoading ? (
          <S.ItemOptionButton onClick={callback}>
            <FaTrash className="btn-trash" />
          </S.ItemOptionButton>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </S.ItemOptionDiv>
    </S.Item>
  );
};

export default TodoItem;

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
      cursor: pointer;
    }

    .spinner {
      font-size: 20px;
      animation: spin 2s linear infinite;
      display: flex;
      align-self: center;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
  ItemOptionDiv: styled.div`
    float: right;
  `,
  ItemOptionButton: styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;

    .btn-trash {
      color: orangered;
      font-size: 16px;
    }

    .btn-trash:hover {
      opacity: 0.5;
    }
  `,
};
