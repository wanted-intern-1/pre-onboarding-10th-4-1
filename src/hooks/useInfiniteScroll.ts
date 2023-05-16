import { useEffect, useState } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

type Props = {
  fn: Function;
  initData: [];
};

const useInfiniteScroll = ({ fn, initData = [] }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [pageParam, setPageParam] = useState(2);
  const [state, setState] = useState([] as string[]);

  useEffect(() => {
    setState([...initData]);
    setIsLastPage(false);
    setPageParam(2);

    console.log(initData);
  }, [initData]);

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect: async ([{ isIntersecting }]) => {
      if (isIntersecting && !isLoading && !isLastPage) {
        setIsLoading(true);
        const { data } = await fn(pageParam);

        setState([...state, ...data.result]);

        if (data.result.length === 0) setIsLastPage(true);
        else setPageParam((prev) => prev + 1);
        setIsLoading(false);
      }
    },
  });

  return { setTarget, isLoading, isLastPage, state };
};

export default useInfiniteScroll;
