import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (fn: Function) => {
  const [observationTarget, setObservationTarget] =
    useState<HTMLDivElement | null>(null);
  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        fn();
      },
      { threshold: 1 }
    )
  );

  useEffect(() => {
    const currentTarget = observationTarget;
    const currentObserver = observer.current;
    if (currentTarget) {
      currentObserver.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        currentObserver.unobserve(currentTarget);
      }
    };
  }, [observationTarget]);

  return setObservationTarget;
};
