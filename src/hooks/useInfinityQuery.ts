/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getSearch } from "../api/search";

type ReturnType = [
  isFetching: boolean,
  data: string[],
  fetchNextPage: () => void
];

export const useInfinityQuery = (keyword: string): ReturnType => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);

  const checkHasNextPage = (len: number, total: number) => {
    setHasNextPage(data.length + len <= total);
  };

  const fetchSearch = async () => {
    setIsFetching(true);
    const response = await getSearch({ q: keyword, page });

    const data = response.data.result ?? [];
    setData((prev) => [...prev, ...data]);
    setIsFetching(false);
    checkHasNextPage(response.data.result.length, response.data.total);
  };

  const load = () => {
    if (!keyword) return setData([]);

    setPage(1);
    fetchSearch();
  };

  const loadMore = () => {
    if (!hasNextPage) return;

    setPage((prev) => prev + 1);
    fetchSearch();
  };

  const fetchNextPage = () => {
    if (hasNextPage) {
      loadMore();
    }
  };

  useEffect(() => {
    load();
  }, [keyword]);

  return [isFetching, data, fetchNextPage];
};
