import { UseFetchOptions } from "nuxt/dist/app/composables";
import { KeyOfRes } from "nuxt/dist/app/composables/asyncData";

export const useAPIFetch = (
  request: any,
  opts:
    | UseFetchOptions<
        any,
        (res: any) => any,
        KeyOfRes<(res: any) => any>,
        any,
        "get"
      >
    | undefined
) => {
  const config = useRuntimeConfig();

  return useFetch(request, { baseURL: config.public.apiBase, ...opts });
};
