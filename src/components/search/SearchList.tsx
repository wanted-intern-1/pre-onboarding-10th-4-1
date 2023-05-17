import React, { FormEvent, useRef } from "react";
import { styled } from "styled-components";
import SearchItem from "./SearchItem";
import useDebounce from "../../hooks/useDebounce";
import { useInfinityQuery } from "../../hooks/useInfinityQuery";
import { FaSpinner } from "react-icons/fa";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

type Props = {
  onSubmit: (inputText: string) => (e: FormEvent) => Promise<void>;
  inputText: string;
};

const SearchList = ({ onSubmit, inputText }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const debouncedInputText = useDebounce(inputText);
  const [isFetching, data, fetchNextPage, hasNextPage] =
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
            return (
              <>
                {idx === filterKeywordTodos.length - 3 && hasNextPage ? (
                  <div ref={ref} />
                ) : null}
                <SearchItem
                  key={todo}
                  todo={todo}
                  inputText={inputText}
                  onSubmit={onSubmit(todo)}
                />
              </>
            );
          })}
          <S.IconWrap isVisible={isFetching}>
            <FaSpinner className="spinner" size={14} />
          </S.IconWrap>
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
  IconWrap: styled.div<{ isVisible: boolean }>`
    padding: 6px 12px;
    display: ${(props) => (props.isVisible ? "flex" : "none")};
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
