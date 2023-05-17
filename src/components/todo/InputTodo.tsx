import { FaSpinner, FaPlusCircle } from "react-icons/fa";
import React, { FormEvent, useEffect, useState } from "react";

import styled from "styled-components";
import SearchSvg from "../../assets/SearchSvg";
import SpinnberSvg from "../../assets/SpinnerSvg";
import { useFocus } from "../../hooks";
import { ITodo } from "../../types/common";
import { debounce } from "../../utils/debounce";
import { useCreateTodo } from "../../hooks/useCreateTodo";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  inputText: string;
};

const InputTodo = ({ setTodos, setInputText, inputText }: Props) => {
  const { isLoading, handleCreateTodo } = useCreateTodo();
  const { ref, setFocus } = useFocus();
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return alert("Please write something");
    await handleCreateTodo(trimmed, setTodos);
    setInputText("");
  };

  const onFormClick = () => {
    setIsClick((prev) => !prev);
  };

  return (
    <S.FormWrap onClick={onFormClick} isClick={isClick} onSubmit={handleSubmit}>
      <S.SearchIcon />
      <S.Input
        placeholder="Add new todo..."
        ref={ref}
        onChange={debounce((e) => setInputText(e.target.value))}
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
    width: 280px;
    line-height: 20px;
    font-size: 1rem;
    padding-right: 5px;
    padding-left: 10px;
  `,
  SearchIcon: styled(SearchSvg)`
    &:path {
      width: 14px;
      height: 14px;
    }
  `,
  SpinnerIcon: styled(SpinnberSvg)`
    display: flex;
    align-self: center;
  `,
};

export default InputTodo;
