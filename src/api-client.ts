import createClient from "openapi-fetch";
import type { paths } from "./openapi";
import { useAuthToken } from "./lib/auth/hooks";

export const apiClient = createClient<paths>({});

export const useApiClient = () => {
  const authToken = useAuthToken();

  const client = createClient<paths>({});
  client.use({
    onRequest({ request }) {
      console.log(request, authToken);
      if (authToken) {
        request.headers.set("Authorization", "Bearer " + authToken);
      }
    },
  });

  return client;
};
