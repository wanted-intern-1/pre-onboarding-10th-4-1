import { FaPlusCircle } from "react-icons/fa";
import { FormEvent, useContext, useEffect, useState, useCallback } from "react";

import useFocus from "../../hooks/useFocus";
import styled, { keyframes } from "styled-components";
import SearchSvg from "../../assets/SearchSvg";
import { TodoInputContext } from "../../context/TodoInputContext";
import { TodoActionContex } from "../../context/TodoActionContext";
import useDebounce from "../../hooks/useDebounce";
import Spinner from "../common/Spinner";
import { TodoContext } from "../../context/TodoContext";

const InputTodo = () => {
  const { ref, setFocus } = useFocus();

  const { outSideClick, setOutSideClick, isLoading, setIsLoading } =
    useContext(TodoActionContex);
  const { setInputText, inputText } = useContext(TodoInputContext);
  const [debounceValue, setDebounceValue] = useState("");

  const { createTodoItem } = useContext(TodoContext);
  useEffect(() => {
    setFocus();
  }, [setFocus]);

  useDebounce(() => setInputText(debounceValue), 500);

  const onFormClick = () => {
    setOutSideClick(false);
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      try {
        setIsLoading(true);
        e.preventDefault();
        await createTodoItem(inputText);
        setDebounceValue("");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setDebounceValue("");
      }
    },
    [inputText, createTodoItem]
  );

  return (
    <S.FormWrap
      onSubmit={handleSubmit}
      onClick={onFormClick}
      isClick={outSideClick}
    >
      <S.SearchIcon />
      <S.Input
        placeholder="Add new todo..."
        ref={ref}
        value={debounceValue}
        onChange={(e) => setDebounceValue(e.target.value)}
        disabled={isLoading}
      />
      {isLoading ? (
        <S.SpinnerLine>
          <Spinner />
        </S.SpinnerLine>
      ) : (
        <S.SubmiBtn type="submit">
          <FaPlusCircle />
        </S.SubmiBtn>
      )}
    </S.FormWrap>
  );
};

const S = {
  FormWrap: styled.form<{ isClick: boolean }>`
    border: 1px solid
      ${({ theme, isClick }) =>
        isClick ? theme.colors.neutral300 : theme.colors.neutral600};
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
  SubmiBtn: styled.button`
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: darkcyan;
    font-size: 16px;
  `,
  SpinnerLine: styled.div`
    display: flex;
    justify-content: center;
    width: 16px;
    height: 16px;
  `,
};

export default InputTodo;
