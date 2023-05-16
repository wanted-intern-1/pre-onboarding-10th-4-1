import { useCallback, useState } from 'react';

type Props = {
  fn: Function;
  deps: any;
};

const useAsync = ({ fn, deps = [] }: Props) => {
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const callback = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      if (response) {
        const { data } = response;
        setValue(data);
      }
    } catch (error) {
      error instanceof Error && setError(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...deps]);

  return { value, isLoading, error, callback };
};

export default useAsync;
