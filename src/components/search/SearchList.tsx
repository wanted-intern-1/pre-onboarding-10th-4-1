import React from 'react';
import { styled } from 'styled-components';
import SearchItem from './SearchItem';

const SearchList = ({ searchList = [] }) => {
  return (
    <S.Container>
      {searchList && (
        <ul>
          {searchList.map((listItem, i) => {
            return <SearchItem key={i} id={i} listItem={listItem} />;
          })}
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

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      height: 30%;
      background-color: ${({ theme }) => theme.colors.neutral600};
      border-radius: 20px;
    }
  `,
};

export default SearchList;
