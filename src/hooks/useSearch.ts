import { useEffect, useState } from "react";

import { getSearch } from "../api/search";

export type IUseSearch = {
  searches: string[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => {};
};

const useSearch = (keyword: string): IUseSearch => {
  const [page, setPage] = useState(1);
  const [searches, setSearches] = useState<string[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    if (!isLoading) load();
  }, [keyword]);

  const load = async () => {
    try {
      setIsLoading(true);
      setPage(1);
      if (!keyword) setSearches([]);
      else await get(page, true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNextPage = async () => {
    if (!hasNextPage || page !== 1) return;
    try {
      setIsFetching(true);
      if (!keyword) setSearches([]);
      else {
        console.log(page);
        await get(page + 1, false);
      }
    } finally {
      setPage(page + 1);
      setIsFetching(false);
    }
  };

  const get = async (page: number = 1, isNewKeyword: boolean) => {
    const res = await getSearch({ q: keyword, page });
    isNewKeyword
      ? setSearches((prev) => [...res.data.result])
      : setSearches((prev) => prev && [...prev, ...res.data.result]);
    if (
      searches &&
      searches.length + res.data.result.length === res.data.total
    ) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
  };

  return {
    searches,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
  };
};

export default useSearch;
