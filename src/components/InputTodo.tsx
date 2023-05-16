import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { ITodo } from "../types/common";
import { createTodo } from "../api/todo";
import useFocus from "../hooks/useFocus";
import { styled } from "styled-components";
import { LoadingIcon, SearchIcon } from "../assets";
import DropdownList from "./DropdownList";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

const InputTodo = ({ setTodos }: Props) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const { ref, setFocus } = useFocus();

  const listRef = useRef<HTMLDivElement>(null);

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

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setIsSearchLoading(true);
    setItems([]);
    requestItem();
  };

  const requestItem = useCallback(async () => {
    try {
      setIsScrollBottom(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsScrollBottom(false);
        setIsSearchLoading(false);
      }, 3000);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (listRef.current === null) {
      return;
    }
    const {
      current: { scrollTop, clientHeight, scrollHeight },
    } = listRef;

    if (scrollTop + clientHeight === scrollHeight && !isScrollBottom) {
      requestItem();
    }
  }, [isScrollBottom, requestItem]);

  useEffect(() => {
    const list = listRef.current;
    list?.addEventListener("scroll", handleScroll);
    return () => list?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.SearchIcon src={SearchIcon} alt="search"></S.SearchIcon>
      <S.InputText
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={handleChangeInput}
        disabled={isLoading}
      />
      <S.SpinnerIcon
        className="spinner"
        src={LoadingIcon}
        alt="spinner"
        isVisible={isSearchLoading}
      />
      <S.DropdownWrap>
        <DropdownList
          items={items}
          ref={listRef}
          inputText={inputText}
          isScrollBottom={isScrollBottom}
        />
      </S.DropdownWrap>
    </S.FormContainer>
  );
};

export default InputTodo;

const S = {
  FormContainer: styled.form`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  `,
  SearchIcon: styled.img`
    position: absolute;
    left: 13px;
    height: 20px;
  `,
  SpinnerIcon: styled.img<{ isVisible: boolean }>`
    position: absolute;
    right: 13px;
    height: 20px;
    display: ${(props) => (props.isVisible ? "flex" : "none")};
  `,
  InputText: styled.input`
    outline: none;
    font-size: 1rem;
    font-weight: 400;
    width: 100%;
    padding: 12px 41px;
    border: 1px solid #dedede;
    background: #ffffff;
    border-radius: 6px;
    &::placeholder {
      color: #9f9f9f;
      font-size: 14px;
    }
    &:hover {
      padding: 10px 39px;
      border: 3px solid #dedede;
    }
    &:focus {
      padding: 12px 41px;
      border: 1px solid #9f9f9f;
    }
  `,
  InputSubmit: styled.button`
    height: 45px;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
  `,
  DropdownWrap: styled.div`
    width: 100%;
    position: absolute;
    top: 48px;
    z-index: 2;
  `,
};
