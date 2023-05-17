import { useState, useEffect, useRef, useCallback } from 'react';

function useHover<T extends HTMLElement = HTMLElement>(): [
  React.MutableRefObject<T | null>,
  boolean
] {
  const [value, setValue] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseOver = useCallback((): void => setValue(true), []);
  const handleMouseOut = useCallback((): void => setValue(false), []);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return (): void => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [handleMouseOver, handleMouseOut]);

  return [ref, value];
}

export default useHover;
