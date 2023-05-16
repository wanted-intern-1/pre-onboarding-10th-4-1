import { useState, useEffect } from 'react';

const DELAY = 500;

export function useDebounce(value: string) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
}
