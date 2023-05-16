import { FormEvent, useCallback, useContext, useState } from "react";

import { BiSearch } from "react-icons/bi";
import Btn from "./common/Btn";
import InputDropBox from "./InputDropbox";
import { TodoContext } from "../contexts/TodoContext";
import { styled } from "styled-components";
import useFocus from "../hooks/useFocus";
import useSearch from "../hooks/useSearch";

const InputTodo = () => {
  const { createTodo, isLoading } = useContext(TodoContext);
  const [inputText, setInputText] = useState("");
  const search = useSearch(inputText);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const { ref, setFocus } = useFocus();

  // useEffect(() => {
  //   setFocus();
  // }, [setFocus]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      await createTodo(inputText);
      setInputText("");
    },
    [inputText]
  );

  const handleClick = async (keyword: string) => {
    await createTodo(keyword);
    setInputText("");
  };

  return (
    <>
      <S.cont onSubmit={handleSubmit} isFocused={isFocused}>
        <BiSearch />
        <S.input
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {search.isLoading && <Btn icon="spinner" />}
      </S.cont>
      <InputDropBox
        inputText={inputText}
        onClick={handleClick}
        search={search}
      />
    </>
  );
};

const S = {
  cont: styled.form<{ isFocused: boolean }>`
    width: 364px;
    margin-bottom: 0.5rem;
    display: flex;
    border-radius: 0.5rem;
    border: ${(props) =>
      props.isFocused ? "1px solid #9F9F9F" : "1px #dedede solid"};
    align-items: center;
    padding-left: 1rem;
    &:hover {
      box-shadow: 0px 0px 1px 1px #dedede;
    }
  `,
  input: styled.input`
    font-size: 1rem;
    font-weight: 400;
    width: 85%;
    padding-right: 5px;
    padding-left: 10px;
    border-radius: calc(0.5 * 100px);
    background-color: transparent;
    height: 45px;
    outline: none;
    border: none;
  `,
  submit: styled.button`
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 45px;
    outline: none;
    border: none;
  `,
};

export default InputTodo;
