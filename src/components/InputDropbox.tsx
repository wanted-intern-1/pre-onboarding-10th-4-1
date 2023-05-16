import Btn from "./common/Btn";
import { styled } from "styled-components";
import useSearch from "../hooks/useSearch";

type Props = {
  inputText: string;
  onClick: (keyword: string) => Promise<void>;
};

const InputDropBox = ({ inputText, onClick }: Props) => {
  const { searches, ref, inView, isLoading, isFetching } = useSearch(inputText);

  if (!searches) return <></>;

  return (
    <S.cont>
      <S.dropbox>
        {!isLoading &&
          searches.map((search, i) => (
            <>
              <S.dropboxElem onClick={() => onClick(search)}>
                {search}
              </S.dropboxElem>
              {i === searches.length - 1 && <div ref={ref}></div>}
            </>
          ))}
        {isFetching && <Btn icon="spinner" />}
      </S.dropbox>
      {!searches ||
        searches.length === 0 ||
        (!isLoading && !inView && <div>...</div>)}
    </S.cont>
  );
};

const S = {
  cont: styled.div`
    position: absolute;
  `,
  dropbox: styled.div`
    width: 100%;
    max-height: 10rem;
    width: 20rem;
    overflow-y: scroll;
    background: white;
  `,
  dropboxElem: styled.div`
    margin-bottom: 1rem;
  `,
};

export default InputDropBox;
