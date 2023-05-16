import { FaPlusCircle, FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";

import SearchSvg from "../../assets/SearchSvg";
import SpinnberSvg from "../../assets/SpinnerSvg";
import styled from "styled-components";
import useFocus from "../../hooks/useFocus";

type Props = {
  isLoading: boolean;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (inputText: string) => Promise<void>;
  inputText: string;
};

const InputTodo = ({
  isLoading,

  setInputText,
  inputText,
  onSubmit,
}: Props) => {
  const { ref, setFocus } = useFocus();
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const onFormClick = () => {
    setIsClick((prev) => !prev);
  };

  return (
    <S.FormWrap
      onClick={onFormClick}
      isClick={isClick}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(inputText);
      }}
    >
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
