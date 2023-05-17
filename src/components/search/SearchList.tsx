import { FormEvent, useEffect, useRef } from 'react';

import type { DefaultTheme } from 'styled-components';
import SearchItem from './SearchItem';
import SpinnerSvg from '../../assets/SpinnerSvg';
import { styled } from 'styled-components';
import useDebounce from '../../hooks/useDebounce';
import { useInfinityQuery } from '../../hooks/useInfinityQuery';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

type Props = {
  onSubmit: (inputText: string) => (e: FormEvent) => Promise<void>;
  inputText: string;
  setIsSearchLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchList = ({ onSubmit, inputText, setIsSearchLoading }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const debouncedInputText = useDebounce(inputText);
  const [isFetching, data, fetchNextPage, hasNextPage] =
    useInfinityQuery(debouncedInputText);

  useEffect(() => {
    setIsSearchLoading(isFetching);
  }, [isFetching]);

  useIntersectionObserver(ref, { threshold: 0.5 }, fetchNextPage);

  if (inputText.length <= 0 || isFetching) return <></>;
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
      <ul>
        {data.map((todo, idx) => {
          return (
            <>
              {idx === data.length - 3 && hasNextPage && !isFetching ? (
                <div ref={ref} />
              ) : null}
              <SearchItem
                key={todo}
                todo={todo}
                inputText={debouncedInputText}
                onSubmit={onSubmit(todo)}
              />
            </>
          );
        })}
        <S.IconWrap isVisible={isFetching}>
          <SpinnerSvg />
        </S.IconWrap>
      </ul>
    </S.Container>
  );
};

const S = {
  Container: styled.div<DefaultTheme>`
    border: 1px solid
      ${({ theme }: { theme: DefaultTheme }) => theme.colors.neutral300};
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
    display: ${(props: { isVisible: boolean }) =>
      props.isVisible ? 'flex' : 'none'};
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
