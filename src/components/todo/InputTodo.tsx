import { FaSpinner, FaPlusCircle } from 'react-icons/fa';
import { FormEvent, useEffect, useState } from 'react';

import useFocus from '../../hooks/useFocus';
import styled from 'styled-components';
import SearchSvg from '../../assets/SearchSvg';
import SpinnerSvg from '../../assets/SpinnerSvg';

type Props = {
  isLoading: boolean;
  onSubmit: (inputText: string) => (e: FormEvent) => Promise<void>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  inputText: string;
};

const InputTodo = ({ isLoading, onSubmit, setInputText, inputText }: Props) => {
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
      onSubmit={onSubmit(inputText)}
    >
      <button className="input-submit" type="submit">
        <S.SearchIcon />
      </button>
      <S.Input
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputText(e.target.value)
        }
        disabled={isLoading}
      />
      {isLoading && <SpinnerSvg />}
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
  SpinnerIcon: styled(SpinnerSvg)`
    display: flex;
    align-self: center;
  `,
};

export default InputTodo;
