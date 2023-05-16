import Btn from "./common/Btn";
import { IUseSearch } from "../hooks/useSearch";
import { styled } from "styled-components";

type Props = {
  inputText: string;
  onClick: (keyword: string) => Promise<void>;
  search: IUseSearch;
};

const InputDropBox = ({ inputText, onClick, search }: Props) => {
  const { searches, ref, inView, isLoading, isFetching } = search;

  if ((searches?.length === 0 || !searches) && !isLoading) return <></>;
  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <S.highlight>{part}</S.highlight>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <>
      {!isLoading && (
        <S.cont>
          <S.dropbox>
            {searches?.map((search, i) => (
              <>
                <S.elem onClick={() => onClick(search)}>
                  {getHighlightedText(search, "lorem")}
                </S.elem>
                {i === searches.length - 1 && <S.ref ref={ref}></S.ref>}
              </>
            ))}
            {isFetching && (
              <S.statusCont>
                <Btn icon="spinner" />
              </S.statusCont>
            )}
          </S.dropbox>
          {searches?.length !== 0 && !isLoading && !inView && (
            <S.statusCont>...</S.statusCont>
          )}
        </S.cont>
      )}
    </>
  );
};

const S = {
  cont: styled.div`
    position: absolute;
    width: 364px;
    box-shadow: 0px 2px 4px 0px #3232321a;
    border-radius: 0.5rem;
    border: 1px solid #dedede;
    top: 220px;
    background: white;
    z-index: 1;
  `,
  dropbox: styled.div`
    width: 100%;
    max-height: 10rem;
    overflow-y: scroll;
    background: white;
    border-radius: 0.5rem;
    margin: 0.5rem 0;
    margin-bottom: 0;
  `,
  elem: styled.div`
    margin-bottom: 1rem;
    padding: 0.5rem;
    margin: 0 0.5rem;
    border-radius: 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &:hover {
      background: #f2f2f2;
    }
    &:active {
      background: #d5f4f1;
    }
  `,
  statusCont: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 0.5rem;
  `,
  ref: styled.div`
    height: 1rem;
  `,
  highlight: styled.span`
    color: #2bc9ba;
  `,
};

export default InputDropBox;
