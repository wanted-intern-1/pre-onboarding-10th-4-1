import { styled } from "styled-components";
import SearchItem from "./SearchItem";
import { useContext, useEffect, useRef, useState } from "react";
import { TodoInputContext } from "../../context/TodoInputContext";
import useSearch from "../../hooks/useSearch";
import { TodoActionContex } from "../../context/TodoActionContext";
import Spinner from "../common/Spinner";
import useIntersectionObeserver from "../../hooks/useIntersectionOberver";
import MoreSvg from "../../assets/MoreSvg";

const INITIAL_PAGE = 1;

const SearchList = () => {
  const targetRef = useRef(null);
  const [start, setStart] = useState(INITIAL_PAGE);
  const limit = 10;

  const { isLoading, setOutSideClick } = useContext(TodoActionContex);
  const { inputText } = useContext(TodoInputContext);

  const { data: fetchTodos, total } = useSearch({ inputText, start, limit });
  const [todos, setTodos] = useState<Array<string>>([]);

  const incresePage = () => {
    if (start * limit < total) {
      setStart((prevStart) => prevStart + INITIAL_PAGE);
    }
  };

  useEffect(() => {
    setTodos([]);
    setStart(INITIAL_PAGE);
    setOutSideClick(false);
  }, [inputText]);

  useEffect(() => {
    setTodos([...todos, ...fetchTodos]);
  }, [fetchTodos]);

  useIntersectionObeserver(targetRef, { threshold: 1.0 }, incresePage);

  return (
    <>
      {todos.length > 0 && (
        <S.Container>
          <ul>
            {todos.map((todo, idx) => {
              return <SearchItem key={idx} todo={todo} />;
            })}
          </ul>

          {isLoading && todos.length >= limit ? (
            <S.SpinnerBox>
              <S.SpinnerLine>
                <Spinner />
              </S.SpinnerLine>
            </S.SpinnerBox>
          ) : (
            <S.MoreLine ref={targetRef}>
              <S.MoreIcon />
            </S.MoreLine>
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
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 110%;
    background-color: #fff;
    z-index: 999;
  `,
  SpinnerLine: styled.div`
    width: 16px;
    height: 16px;
  `,
  SpinnerBox: styled.div`
    display: flex;
    justify-content: center;
  `,
  MoreIcon: styled(MoreSvg)``,
  MoreLine: styled.div`
    display: flex;
    justify-content: center;
  `,
};

export default SearchList;
