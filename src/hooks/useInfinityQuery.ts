/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { getSearch } from '../api/search';

type ReturnType = {
  isLoading: boolean;
  isFetching: boolean;
  data: string[];
  fetchNextPage: () => Promise<void>;
  hasNextPage: boolean;
};

export const useInfinityQuery = (keyword: string): ReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);

  const fetchSearch = async (page: number) => {
    const response = await getSearch({ q: keyword, page });

    setHasNextPage(
      data.length + response.data.result.length !== response.data.total
    );
    setData((prev) => [...prev, ...response.data.result]);
    setPage(page + 1);
  };

  const load = async () => {
    setData([]);
    if (!keyword) return;

    setIsLoading(true);
    await fetchSearch(1);
    setIsLoading(false);
  };

  const loadMore = async () => {
    if (!hasNextPage) return;

    setIsFetching(true);
    await fetchSearch(page);
    setIsFetching(false);
  };

  const fetchNextPage = loadMore;

  useEffect(() => {
    load();
  }, [keyword]);

  return { isLoading, isFetching, data, fetchNextPage, hasNextPage };
};
