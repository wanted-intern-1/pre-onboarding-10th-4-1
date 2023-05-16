import { useEffect, useState } from 'react';

interface Props {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({ root, rootMargin, threshold, onIntersect }: Props) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
};

export default useIntersectionObserver;
