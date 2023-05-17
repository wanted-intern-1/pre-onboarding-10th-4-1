import { FormEvent, useEffect, useState } from 'react';

import type { DefaultTheme } from 'styled-components';
import SearchSvg from '../../assets/SearchSvg';
import SpinnerSvg from '../../assets/SpinnerSvg';
import styled from 'styled-components';
import useFocus from '../../hooks/useFocus';

type Props = {
  isLoading: boolean;
  onSubmit: (inputText: string) => (e: FormEvent) => Promise<void>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  inputText: string;
  isSearchLoading: boolean;
};

const InputTodo = ({
  isLoading,
  onSubmit,
  setInputText,
  inputText,
  isSearchLoading,
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
      {(isLoading || isSearchLoading) && (
        <S.SpinnerWarper>
          <SpinnerSvg />
        </S.SpinnerWarper>
      )}
    </S.FormWrap>
  );
};

const S = {
  FormWrap: styled.form<{ isClick: boolean }>`
    border: 1px solid
      ${({ theme, isClick }: { theme: DefaultTheme; isClick: boolean }) =>
        isClick ? theme.colors.neutral600 : theme.colors.neutral300};
    border-radius: 6px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 13px;
    gap: 8px;
    width: 364px;
    height: 44px;
    margin: 0 auto;
    margin-bottom: 10px;
    &:hover {
      outline: 3px solid
        ${({ theme }: { theme: DefaultTheme }) => theme.colors.neutral300};
    }
    &:active {
      border: 1px solid
        ${({ theme }: { theme: DefaultTheme }) => theme.colors.neutral600};
    }
  `,
  Input: styled.input`
    width: 260px;
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
  SpinnerWarper: styled.span`
    margin-left: 1.2rem;
  `,
};

export default InputTodo;
