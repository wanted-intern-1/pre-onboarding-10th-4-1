import { FaSpinner, FaSearch } from "react-icons/fa";

import { useEffect } from "react";

import { ITodo } from "../types/common";
import { createTodo } from "../api/todo";
import useFocus from "../hooks/useFocus";
import useForm from "../hooks/useForm";
import styled from "styled-components";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

const InputTodo = ({ setTodos }: Props) => {
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const { values, isLoading, handleChange, handleSubmit } = useForm({
    initialValue: {
      search: "",
    },
    onSubmit: async ({ search }: { search: string }) => {
      const newItem: Omit<ITodo, "id"> = { title: search.trim() };
      const { data } = await createTodo(newItem);

      if (data) setTodos((prev) => [...prev, data as ITodo]);
    },
    validate: ({ search }: { search: string }) => {
      const error: any = {};

      const trimmed = search.trim();
      if (!trimmed) {
        alert("Please write something");
        error.search = "Error: input empty";
      }

      return error;
    },
  });

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.SubmitIconDiv>
        <FaSearch className="btn-plus" />
      </S.SubmitIconDiv>
      <S.Input
        placeholder="Add new todo..."
        name="search"
        ref={ref}
        value={values.search}
        onChange={handleChange}
        disabled={isLoading}
      />
      {isLoading && <FaSpinner className="spinner" />}
    </S.FormContainer>
  );
};

export default InputTodo;

const S = {
  FormContainer: styled.form`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-evenly;
    position: relative;

    .spinner {
      font-size: 20px;
      animation: spin 2s linear infinite;
      display: flex;
      align-self: center;

      position: absolute;
      right: 12px;
      top: 12px;
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
  Input: styled.input`
    font-size: 1rem;
    font-weight: 400;
    width: 100%;
    padding: 12px 13px 12px 41px;
    background-color: transparent;

    height: 45px;
    outline: none;
    border: 1px solid rgba(159, 159, 159, 0.4);
    border-radius: 6px;

    &:hover {
      border: 3px solid rgba(159, 159, 159, 0.4);
    }
    &:focus {
      border-color: rgba(0, 0, 0, 0.4);
    }
  `,
  SubmitIconDiv: styled.div`
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;

    height: 45px;
    outline: none;
    border: none;

    position: absolute;
    left: 16px;
    top: 0;

    .btn-plus {
      color: #7d7d7d;
      font-size: 14px;
    }

    .btn-plus:hover {
      opacity: 0.5;
    }
  `,
};
