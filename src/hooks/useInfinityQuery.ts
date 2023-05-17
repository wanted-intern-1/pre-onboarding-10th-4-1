/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { getSearch } from '../api/search';

type ReturnType = [
  isFetching: boolean,
  data: string[],
  fetchNextPage: () => void,
  hasNextPage: boolean
];

export const useInfinityQuery = (keyword: string): ReturnType => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);

  const fetchSearch = async (page: number) => {
    setIsFetching(true);
    const response = await getSearch({ q: keyword, page });

    setHasNextPage(
      data.length + response.data.result.length !== response.data.total
    );
    setData((prev) => [...prev, ...response.data.result]);
    setIsFetching(false);
    setPage(page + 1);
  };

  const load = async () => {
    if (!keyword) return setData([]);

    await fetchSearch(1);
  };

  const loadMore = async () => {
    if (!hasNextPage) return;

    await fetchSearch(page);
  };

  const fetchNextPage = loadMore;

  useEffect(() => {
    load();
  }, [keyword]);

  return [isFetching, data, fetchNextPage, hasNextPage];
};
