import { FaSpinner, FaPlusCircle } from 'react-icons/fa';
import { FormEvent, useCallback, useEffect, useState } from 'react';

import { ITodo } from '../../types/common';
import useFocus from '../../hooks/useFocus';
import styled from 'styled-components';
import SearchSvg from '../../assets/SearchSvg';
import SpinnberSvg from '../../assets/SpinnerSvg';
import { useInputContext } from '../../contexts/InputProvider';
import { useTodoListDispatchContext } from '../../contexts/TodoListProvider';

const InputTodo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();
  const [isClick, setIsClick] = useState(false);
  const { inputText, handleInputChange } = useInputContext();
  const { onCreateTodo } = useTodoListDispatchContext();

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
          return alert('Please write something');
        }

        const newItem: Omit<ITodo, 'id'> = { title: trimmed };
        await onCreateTodo(newItem);
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        handleInputChange('');
        setIsLoading(false);
      }
    },
    [inputText, handleInputChange, onCreateTodo]
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
        onChange={(e) => handleInputChange(e.target.value)}
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
      ${({ theme, isClick }) => (isClick ? theme.colors.neutral600 : theme.colors.neutral300)};
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
