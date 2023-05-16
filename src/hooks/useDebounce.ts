import React, { useEffect } from "react";

const useDebounce = (callback: () => void, time: number) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, time);
    return () => {
      clearTimeout(timer);
    };
  }, [callback, time]);
};

export default useDebounce;
