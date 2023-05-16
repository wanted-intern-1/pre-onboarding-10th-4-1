import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import SearchItem from "./SearchItem";
import apiRequest from "../../api";
import Union from "../../assets/Union.png";
import useIntersectionObeserver from "../../hooks/useIntersectionObeserver";
import { FaSpinner } from "react-icons/fa";

type Props = {
  inputText: string;
  debounceValue: string;
};

const SearchList = ({ inputText, debounceValue }: Props) => {
  const [recommendedKeywords, setRecommendedKeywords] = useState<string[]>([]);
  const iconRef = useRef<HTMLLIElement>(null);
  const [loadable, setLoadable] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [load, setLoad] = useState(false);

  const fetchInfo = async () => {
    if (loadable) {
      setLoad(true);
      const { data } = await apiRequest.get("/search", {
        params: { q: debounceValue, page: page + 1 },
      });
      setLoad(false);
      if (data.qty < 10) {
        setLoadable(false);
      }
      setPage(page + 1);
      setRecommendedKeywords([...recommendedKeywords, ...data.result]);
    }
  };

  useIntersectionObeserver(iconRef, { threshold: 1.0 }, fetchInfo);
  console.log(iconRef.current);

  useEffect(() => {
    if (debounceValue) {
      (async () => {
        const { data } = await apiRequest.get("/search", {
          params: { q: debounceValue, page: 1 },
        });
        if (data.qty < 10) {
          setLoadable(false);
        }
        setPage(1);
        setLoadable(true);
        setRecommendedKeywords(data.result);
      })();
    }
  }, [debounceValue]);

  return (
    <S.Container>
      <ul>
        {recommendedKeywords.map((keyword, index) => {
          return (
            <SearchItem key={index} keyword={keyword} inputText={inputText} />
          );
        })}
        {recommendedKeywords.length > 5 &&
          (load ? (
            <S.Icon>
              <FaSpinner className="spinner" />
            </S.Icon>
          ) : (
            <S.Icon ref={iconRef}>
              <img src={Union} width={11.67} height={2.5} />
            </S.Icon>
          ))}
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
  Icon: styled.li`
    display: flex;
    justify-content: center;
  `,
};

export default SearchList;
