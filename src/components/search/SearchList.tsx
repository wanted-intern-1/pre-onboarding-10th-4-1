import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import SearchItem from './SearchItem';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { getSearch } from '../../api/search';
import { useInputContext } from '../../contexts/InputProvider';
import { useDebounce } from '../../hooks/useDebounce';
import { FaEllipsisH, FaSpinner } from 'react-icons/fa';

const DEFAULT_SEARCH_PARAMS = {
  PAGE_NUM: 1,
  LIMIT: 10,
};

const SearchList = () => {
  const { inputText } = useInputContext();
  const [searchList, setSearchList] = useState([]);
  const debouncedValue = useDebounce(inputText);

  const fetchData = useCallback(
    async (pageParam = 1) => {
      return await getSearch({
        q: debouncedValue,
        page: pageParam,
        limit: DEFAULT_SEARCH_PARAMS.LIMIT,
      });
    },
    [debouncedValue]
  );

  useEffect(() => {
    const getSearchList = async () => {
      const { data } = await fetchData();

      setSearchList(data.result);
    };

    debouncedValue !== '' ? getSearchList() : setSearchList([]);
  }, [debouncedValue, fetchData]);

  const { target, isLoading, isLastPage, state } = useInfiniteScroll({
    fn: fetchData,
    initData: searchList,
  });

  return (
    <>
      {state.length ? (
        <S.Container>
          <S.UnorderedList>
            {state.map((listItem, i) => {
              return <SearchItem key={i} id={i} listItem={listItem} />;
            })}
            {!isLastPage ? (
              <li ref={target}>{isLoading && <FaSpinner className="spinner" />}</li>
            ) : (
              <li>
                <FaEllipsisH />
              </li>
            )}
          </S.UnorderedList>
        </S.Container>
      ) : (
        <></>
      )}
    </>
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

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      height: 30%;
      background-color: ${({ theme }) => theme.colors.neutral600};
      border-radius: 20px;
    }
  `,
  UnorderedList: styled.ul`
    li {
      &:last-of-type {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  `,
};

export default SearchList;
