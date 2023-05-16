import { useLayoutEffect, useRef } from "react";

const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setFocus = () => {
    ref.current && ref.current.focus();
  };

  useLayoutEffect(() => {
    setFocus();
  }, []);

  return { ref };
};

export default useFocus;
