import { useState, useCallback } from "react";

type Props = {
  fn: Function;
  deps: any;
};

const useAsync = ({ fn, deps = [] }: Props) => {
  const [value, setValue] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const callback = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      response && setValue(response);
    } catch (error) {
      error instanceof Error && setError(error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...deps]);

  return { value, isLoading, error, callback };
};

export default useAsync;
