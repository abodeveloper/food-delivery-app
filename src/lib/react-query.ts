import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      //cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export { ReactQueryDevtools as ReactQueryDevTools } from "@tanstack/react-query-devtools";
