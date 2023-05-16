import { useEffect, useState } from "react";

import { searchApi } from "../api/search";
import useDebounce from "./useDebounce";
import { useIntersectionObserver } from "./useIntersectionObserver";

const useSearch = (keyword: string) => {
  const [page, setPage] = useState(1);
  const [searches, setSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const ref = useIntersectionObserver(() => {
    if (!isLoading) {
      setPage((prev) => prev + 1);
    }
  });

  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    load();
  }, [debouncedKeyword]);

  useEffect(() => {
    if (!hasNextPage) return;
    fetch();
  }, [page]);

  const load = async () => {
    try {
      setIsLoading(true);
      setPage(1);
      if (!keyword) setSearches([]);
      else await getSearch(page);
    } finally {
      setIsLoading(false);
    }
  };

  const fetch = async () => {
    try {
      setIsFetching(true);
      if (!keyword) setSearches([]);
      else await getSearch(page);
    } finally {
      setIsFetching(false);
    }
  };

  const getSearch = async (page: number = 1) => {
    const res = await searchApi.getSearch({ q: debouncedKeyword, page });
    page === 1
      ? setSearches((prev) => [...res.data.result])
      : setSearches((prev) => [...prev, ...res.data.result]);
    if (searches.length + res.data.result.length === res.data.result.total) {
      setHasNextPage(false);
    }
  };

  return { searches, ref, fetch, isLoading, isFetching };
};

export default useSearch;
