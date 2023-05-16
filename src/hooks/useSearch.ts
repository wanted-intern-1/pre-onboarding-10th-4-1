import { useEffect, useState } from "react";

import { searchApi } from "../api/search";
import useDebounce from "./useDebounce";
import { useIntersect } from "./useIntersect";

export type IUseSearch = {
  searches: string[] | undefined;
  ref: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  inView: boolean;
  isLoading: boolean;
  isFetching: boolean;
};

const useSearch = (keyword: string): IUseSearch => {
  const [page, setPage] = useState(1);
  const [searches, setSearches] = useState<string[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  // const ref = useIntersect(() => {
  //   if (!isLoading) {
  //     setPage((prev) => prev + 1);
  //   }
  // });
  const [ref, inView] = useIntersect();

  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    if (!isLoading) setPage((prev) => prev + 1);
  }, [inView]);

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
      : setSearches((prev) => prev && [...prev, ...res.data.result]);
    if (
      searches &&
      searches.length + res.data.result.length === res.data.total
    ) {
      setHasNextPage(false);
    }
  };

  return { searches, ref, inView, isLoading, isFetching };
};

export default useSearch;
