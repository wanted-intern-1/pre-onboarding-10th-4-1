import { styled } from "styled-components";
import SearchItem from "./SearchItem";

type Props = {
  searchResults: any;
  inputText: string;
};

const SearchList = ({ searchResults, inputText }: Props) => {
  return (
    <S.Container>
      <ul>
        {searchResults?.result.map((result: string, index: number) => {
          return (
            <SearchItem key={index} result={result} inputText={inputText} />
          );
        })}
      </ul>
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
