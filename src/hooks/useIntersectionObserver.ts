import { useEffect, useRef } from 'react';

interface Props {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({ root, rootMargin, threshold, onIntersect }: Props) => {
  const target = useRef(null);

  useEffect(() => {
    if (!target.current) return;

    const observer: IntersectionObserver = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(target.current);

    return () => observer.disconnect();
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { target };
};

export default useIntersectionObserver;
