import { CiSearch } from "react-icons/ci";
import { FaSpinner, FaPlusCircle } from "react-icons/fa";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { ITodo } from "../../types/common";
import { createTodo } from "../../api/todo";
import useFocus from "../../hooks/useFocus";
import styled from "styled-components";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  inputText: string;
};

const InputTodo = ({ setTodos, setInputText, inputText }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert("Please write something");
        }

        const newItem: Omit<ITodo, "id"> = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos((prev) => [...prev, data as ITodo]);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setInputText("");
        setIsLoading(false);
      }
    },
    [inputText, setTodos]
  );

  const onFormClick = () => {
    setIsClick((prev) => !prev);
  };

  return (
    <S.FormWrap onClick={onFormClick} isClick={isClick} onSubmit={handleSubmit}>
      <S.SearchIcon />
      <S.Input
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      {!isLoading ? (
        <button className="input-submit" type="submit">
          <FaPlusCircle className="btn-plus" />
        </button>
      ) : (
        <FaSpinner className="spinner" />
      )}
    </S.FormWrap>
  );
};

const S = {
  FormWrap: styled.form<{ isClick: boolean }>`
    border: 1px solid
      ${({ theme, isClick }) =>
        isClick ? theme.colors.neutral600 : theme.colors.neutral300};
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 13px;
    gap: 8px;
    width: 364px;
    height: 44px;
    margin: 0 auto;
    margin-bottom: 10px;
    &:hover {
      border: 3px solid ${({ theme }) => theme.colors.neutral300};
    }
  `,
  Input: styled.input`
    width: 310px;
    line-height: 20px;
    font-size: 1rem;
    padding-right: 5px;
    padding-left: 10px;
  `,
  SearchIcon: styled(CiSearch)`
    color: ${({ theme }) => theme.colors.neutral700};
    &:path {
      width: 14px;
      height: 14px;
    }
  `,
  SpinnerIcon: styled(FaSpinner)`
    animation: spin 2s linear infinite;
    display: flex;
    align-self: center;
  `,
};

export default InputTodo;
