import React, { RefObject, useEffect } from "react";

const useIntersectionObeserver = (
  targetRef: RefObject<Element>,
  options: IntersectionObserverInit,
  callback: () => void
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) callback();
    }, options);

    if (targetRef?.current) {
      observer.observe(targetRef.current);
    }
    return () => observer.disconnect();
  }, [targetRef, options, callback]);
};

export default useIntersectionObeserver;
