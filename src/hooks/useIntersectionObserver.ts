import { RefObject, useEffect } from "react";
import { useThrottle } from "./useThrottle";

export const useIntersectionObserver = (
  ref: RefObject<Element>,
  options: IntersectionObserverInit,
  callback: () => void
): void => {
  const onThrottledCallback = useThrottle(callback, 300);

  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        onThrottledCallback();
        observer.observe(entry.target);
      }
    }, options);

    if (ref.current === null) return;

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onThrottledCallback, options, ref]);
};
