import React, { useRef } from "react";
import { styled } from "styled-components";
import SearchItem from "./SearchItem";
import { ITodo } from "../../types/common";
import useDebounce from "../../hooks/useDebounce";
import { useInfinityQuery } from "../../hooks/useInfinityQuery";
import { FaSpinner, FaEllipsisH } from "react-icons/fa";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

type Props = {
  todos: ITodo[];
  inputText: string;
};

const SearchList = ({ todos, inputText }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const debouncedInputText = useDebounce(inputText);
  const [isFetching, data, fetchNextPage] =
    useInfinityQuery(debouncedInputText);

  useIntersectionObserver(ref, { threshold: 0.5 }, fetchNextPage);

  const filterKeywordTodos =
    data && data.filter((todo) => todo.includes(inputText));

  if (!data.length)
    return (
      <S.Container>
        <ul>
          <S.LabelText>검색결과가 없습니다</S.LabelText>
        </ul>
      </S.Container>
    );
  return (
    <S.Container>
      {filterKeywordTodos && (
        <ul>
          {filterKeywordTodos.map((todo, idx) => {
            return <SearchItem key={todo} todo={todo} inputText={inputText} />;
          })}
          {isFetching ? (
            <S.IconWrap>
              <FaSpinner className="spinner" size={14} />
            </S.IconWrap>
          ) : (
            <S.IconWrap ref={ref}>
              <FaEllipsisH size={14} />
            </S.IconWrap>
          )}
        </ul>
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
  IconWrap: styled.div`
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  LabelText: styled.div`
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
};

export default SearchList;
