import createClient from "openapi-fetch";
import type { paths } from "./openapi";
import { useAuthToken } from "./lib/auth/hooks";
import { useAuthStore } from "./lib/auth/auth.store";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "./routes/routes.enum";

export const apiClient = createClient<paths>({});

export const useApiClient = () => {
  const authToken = useAuthToken();
  const clearAuthStore = useAuthStore((s) => s.clear);
  const navigate = useNavigate();

  const client = createClient<paths>({});
  client.use({
    onRequest({ request }) {
      console.log(request, authToken);
      if (authToken) {
        request.headers.set("Authorization", "Bearer " + authToken);
      }
    },
    async onResponse({ response }) {
      if (!response.ok) {
        const error = (await response.clone().json()) as unknown;
        if (
          typeof error === "object" &&
          error &&
          "errorCode" in error &&
          error.errorCode === "AuthorizationError"
        ) {
          clearAuthStore();
          return void navigate(APP_ROUTES.ROOT, { replace: true });
        }
      }

      return response;
    },
  });

  return client;
};

export type ApiRoutes = paths;
