import { useEffect, useState } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

type Props = {
  fn: Function;
  initData: any[];
};

const DEFAULT_PAGE_NUM = 2;

const useInfiniteScroll = ({ fn, initData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [pageParam, setPageParam] = useState(DEFAULT_PAGE_NUM);
  const [state, setState] = useState([] as any[]);

  useEffect(() => {
    setState([...initData]);
    setIsLastPage(false);
    setPageParam(DEFAULT_PAGE_NUM);
  }, [initData]);

  const { target } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect: async ([{ isIntersecting }]) => {
      if (isIntersecting && !isLoading && !isLastPage) {
        setIsLoading(true);

        const { data } = await fn(pageParam);

        if (data && data.result) {
          setState([...state, ...data.result]);

          data.result.length ? setPageParam((prev) => prev + 1) : setIsLastPage(true);
        }

        setIsLoading(false);
      }
    },
  });

  return { target, isLoading, isLastPage, state };
};

export default useInfiniteScroll;
