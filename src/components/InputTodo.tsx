import { FaSpinner, FaSearch } from "react-icons/fa";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { ITodo } from "../types/common";
import { createTodo } from "../api/todo";
import useFocus from "../hooks/useFocus";
import { styled } from "styled-components";
import { highlight } from "../utils/highlight";

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
      <S.SearchIcon>
        <FaSearch size={14} />
      </S.SearchIcon>
      <S.InputText
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={handleChangeInput}
        disabled={isLoading}
      />
      {isSearchLoading ? (
        <S.SpinnerIcon>
          <FaSpinner className="spinner" size={14} />
        </S.SpinnerIcon>
      ) : null}
      {inputText ? (
        <S.Dropdown ref={listRef}>
          <S.DropdwonList>
            <S.DropdwonItem
              dangerouslySetInnerHTML={{
                __html: highlight(inputText, inputText),
              }}
            />
            {items.map((item) => {
              return (
                <S.DropdwonItem
                  key={item}
                  dangerouslySetInnerHTML={{
                    __html: highlight(item, inputText),
                  }}
                />
              );
            })}
          </S.DropdwonList>
          {isScrollBottom ? (
            <S.DropdownSpinnerIcon>
              <FaSpinner className="spinner" size={14} />
            </S.DropdownSpinnerIcon>
          ) : null}
        </S.Dropdown>
      ) : null}
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
  SearchIcon: styled.div`
    position: absolute;
    left: 13px;
  `,
  SpinnerIcon: styled.div`
    position: absolute;
    right: 13px;
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
  Dropdown: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 48px;
    padding: 9px 4px;
    background: #ffffff;
    border: 1px solid #dedede;
    box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05),
      0px 2px 4px rgba(50, 50, 50, 0.1);
    border-radius: 5px;
    max-height: 164px;
    overflow-y: scroll;
    z-index: 2;
  `,
  DropdwonList: styled.ul`
    width: 100%;
    list-style: none;
  `,
  DropdwonItem: styled.li`
    width: 100%;
    padding: 6px 10px;
    font-size: 14px;

    strong {
      font-weight: 400;
      color: #2bc9ba;
    }

    &:hover {
      background-color: #f2f2f2;
      border-radius: 3px;
    }

    &:active {
      background: #d5f4f1;
    }
  `,
  DropdownSpinnerIcon: styled.div`
    padding: 6px 10px;
  `,
};
