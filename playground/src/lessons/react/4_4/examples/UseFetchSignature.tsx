// @ts-nocheck
function useFetch<T>(
  url: string,
  options?: { enabled?: boolean }
): {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};
