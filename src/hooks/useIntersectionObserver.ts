import { RefObject, useEffect } from "react";

export const useIntersectionObserver = (
  ref: RefObject<Element>,
  options: IntersectionObserverInit,
  callback: () => void
): void => {
  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        callback();
        observer.observe(entry.target);
      }
    }, options);

    if (ref.current === null) return;

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [callback, options, ref]);
};
