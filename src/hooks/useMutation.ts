import { useState, useCallback } from "react";

type FetchAPIFunction<T, R> = (requestData: T) => Promise<R>;

type UseMutationOptions<R> = {
  onSuccess?: (data: R) => void;
  onError?: (error: any) => void;
};

type MutationResult<R> = {
  data: R | undefined;
  isLoading: boolean;
  error: any;
  isError: boolean;
};

const useMutation = <T, R>(
  fetchAPI: FetchAPIFunction<T, R>,
  { onSuccess, onError }: UseMutationOptions<R> = {}
): [(requestData: T) => Promise<void>, MutationResult<R>] => {
  const [data, setData] = useState<R | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);

  const mutation = useCallback(
    async (requestData: T) => {
      setIsLoading(true);

      try {
        const responseData = await fetchAPI(requestData);

        setData(responseData);
        if (onSuccess) {
          onSuccess(responseData);
        }
      } catch (error) {
        setError(error);
        if (onError) {
          onError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [fetchAPI, onSuccess, onError]
  );

  return [mutation, { data, isLoading, error, isError: error !== null }];
};

export default useMutation;
