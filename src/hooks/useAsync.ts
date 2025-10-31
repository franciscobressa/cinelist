import { useState, useEffect, useCallback } from "react";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseAsyncOptions {
  immediate?: boolean;
}

export function useAsync<T>(
  asyncFunction: (signal: AbortSignal) => Promise<T>,
  dependencies: any[] = [],
  options: UseAsyncOptions = { immediate: true }
) {
  const immediate = options?.immediate ?? true;
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(
    async (signal: AbortSignal) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const data = await asyncFunction(signal);

        if (signal.aborted) {
          return;
        }

        setState({ data, loading: false, error: null });
        return data;
      } catch (error: any) {
        const isAbortError =
          error?.name === "CanceledError" ||
          error?.name === "AbortError" ||
          signal.aborted;

        if (isAbortError) {
          return;
        }

        setState({ data: null, loading: false, error });
        throw error;
      } finally {
        if (signal.aborted) {
          setState((prev) => ({ ...prev, loading: false }));
        }
      }
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (!immediate) return;

    const controller = new AbortController();
    execute(controller.signal).catch(() => {});

    return () => {
      controller.abort();
    };
  }, dependencies);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
