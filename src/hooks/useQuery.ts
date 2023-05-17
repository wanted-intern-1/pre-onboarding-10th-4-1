import { useEffect, useState, useCallback } from "react";

type FetchAPIFunction<R> = () => Promise<R>;

const useQuery = <R>(fetchAPI: FetchAPIFunction<R> | null) => {
  const [data, setData] = useState<R | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const refetch = useCallback(async () => {
    if (!fetchAPI) return;
    try {
      setIsLoading(true);

      const responseData = await fetchAPI();
      setData(responseData);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchAPI]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, error, isError: error !== undefined, refetch };
};

export default useQuery;
