import { useCallback, useEffect, useState } from "react";
import { DataResult } from "../types/common";

type FetchAPIFunction<R = DataResult> = (page?: number) => Promise<R>;

const useQuery = (fetchAPI: FetchAPIFunction | null) => {
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const refetch = useCallback(async () => {
    if (!fetchAPI) return;
    try {
      setIsLoading(true);
      setData(undefined);

      const responseData = await fetchAPI(page);

      setData((prevData: any) => {
        if (
          prevData &&
          "result" in prevData &&
          Array.isArray(responseData.result)
        ) {
          return {
            result: [...prevData.result, ...responseData.result],
            total: responseData.total,
          };
        }
        return responseData;
      });
      if (responseData.result.length < responseData.total) {
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchAPI, page]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    isLoading,
    error,
    isError: error !== undefined,
    refetch,
    hasNextPage,
  };
};

export default useQuery;
