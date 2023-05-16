import { FormEvent, useCallback, useContext, useEffect, useState } from "react";

import Btn from "./common/Btn";
import { TodoContext } from "../contexts/TodoContext";
import { styled } from "styled-components";
import useFocus from "../hooks/useFocus";

const InputTodo = () => {
  const { createTodo, isLoading } = useContext(TodoContext);
  const [inputText, setInputText] = useState("");
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      await createTodo(inputText);
      setInputText("");
    },
    [inputText]
  );

  return (
    <S.cont onSubmit={handleSubmit}>
      <S.input
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      {!isLoading ? (
        <S.submit type="submit">
          <Btn icon="plus" />
        </S.submit>
      ) : (
        <Btn icon="spinner" />
      )}
    </S.cont>
  );
};

const S = {
  cont: styled.form`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    border-radius: calc(0.5 * 100px);
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.38);
    justify-content: space-evenly;
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
