import SearchItem from "./SearchItem";
import React, { useEffect, useState } from "react";
import { ITodo } from "../../types/common";
import { styled } from "styled-components";
import { FaSpinner } from "react-icons/fa";
import { getSearchList } from "../../api/search";
import { useCreateTodo } from "../../hooks/useCreateTodo";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  inputText: string;
};

const SearchList = ({ setTodos, setInputText, inputText }: Props) => {
  const [searchList, setSearchList] = useState([]);
  const { isLoading, handleCreateTodo } = useCreateTodo();

  useEffect(() => {
    const getListByKeyword = async () => {
      const { data } = await getSearchList(inputText);
      setSearchList(data.result);
    };

    getListByKeyword();
  }, [inputText]);

  const handleClick = async (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    await handleCreateTodo(target.innerText, setTodos);
    setInputText("");
  };

  return (
    <S.Container>
      {!isLoading ? (
        searchList && (
          <ul>
            {searchList.map((searchItem, index) => {
              return (
                <SearchItem
                  key={index}
                  searchItem={searchItem}
                  inputText={inputText}
                  onClick={handleClick}
                />
              );
            })}
          </ul>
        )
      ) : (
        <FaSpinner className="spinner" />
      )}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    border: 1px solid ${({ theme }) => theme.colors.neutral300};
    width: 364px;
    height: 164px;
    max-height: 164px;
    overflow-y: auto;
    margin: 0 auto;
    border-radius: 5px;
    padding: 9px 5px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 110%;
    background-color: #fff;
    z-index: 999;
  `,
};

export default SearchList;
