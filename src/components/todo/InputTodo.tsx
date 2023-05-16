import { FaPlusCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";

import useFocus from "../../hooks/useFocus";
import styled, { keyframes } from "styled-components";
import SearchSvg from "../../assets/SearchSvg";
import { TodoInputContext } from "../../context/TodoInputContext";
import { TodoActionContex } from "../../context/TodoActionContext";
import useDebounce from "../../hooks/useDebounce";
import Spinner from "../common/Spinner";

const InputTodo = () => {
  const { ref, setFocus } = useFocus();

  const { isClick, setIsClick } = useContext(TodoActionContex);
  const { setInputText } = useContext(TodoInputContext);
  const [debounceValue, setDebounceValue] = useState("");

  const { isLoading } = useContext(TodoActionContex);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  useDebounce(() => setInputText(debounceValue), 500);

  const onFormClick = () => {
    setIsClick((prev) => !prev);
  };

  return (
    <S.FormWrap onClick={onFormClick} isClick={isClick}>
      <S.SearchIcon />
      <S.Input
        placeholder="Add new todo..."
        ref={ref}
        value={debounceValue}
        onChange={(e) => setDebounceValue(e.target.value)}
        disabled={isLoading}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <button className="input-submit" type="submit">
          <FaPlusCircle className="btn-plus" />
        </button>
      )}
    </S.FormWrap>
  );
};

const rotate = keyframes`
  100% {
      transform: rotate(360deg);
  }
`;

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
};

export default InputTodo;
