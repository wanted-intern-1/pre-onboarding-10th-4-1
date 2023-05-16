import { FaSpinner } from "react-icons/fa";
import SearchItem from "./SearchItem";
import { styled } from "styled-components";
import useDebounce from "../../hooks/useDebounce";
import { useEffect } from "react";
import { useIntersect } from "../../hooks/useIntersect";
import useSearch from "../../hooks/useSearch";

type Props = {
  inputText: string;
};

const SearchList = ({ inputText }: Props) => {
  const debouncedInputText = useDebounce(inputText, 500);

  const { searches, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useSearch(debouncedInputText);

  const [ref, inView] = useIntersect();

  useEffect(() => {
    if (!isLoading) fetchNextPage();
  }, [inView]);

  return (
    <>
      {searches?.length !== 0 && !isLoading && (
        <S.Container>
          <ul>
            {searches?.map((search, i) => (
              <>
                <SearchItem search={search} inputText={debouncedInputText} />
                {i === searches.length - 1 && hasNextPage && (
                  <S.Ref ref={ref}></S.Ref>
                )}
              </>
            ))}
            {isFetching && (
              <S.SpinnerCont>
                <FaSpinner className="spinner" />
              </S.SpinnerCont>
            )}
          </ul>
          {searches?.length !== 0 && !isLoading && !inView && (
            <S.EllipsisCont>...</S.EllipsisCont>
          )}
        </S.Container>
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
    padding-bottom: 0px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 110%;
    background-color: #fff;
    z-index: 999;
  `,
  SpinnerCont: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 0.5rem;
  `,
  EllipsisCont: styled.div`
    padding-bottom: 0.5rem;
    background: white;
    bottom: 0;
    position: sticky;
    text-align: center;
  `,
  Ref: styled.div`
    height: 1rem;
  `,
};

export default SearchList;
