import { useEffect, useRef, useState } from "react";

export const useIntersect = (): [
  ref: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>,
  inView: boolean
] => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const observer = useRef(
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
      else setInView(false);
    })
  );

  useEffect(() => {
    const curTarget = ref;
    const curObserver = observer.current;
    if (curTarget) curObserver.observe(curTarget);
    return () => {
      if (curTarget) curObserver.unobserve(curTarget);
    };
  }, [ref]);

  return [setRef, inView];
};
