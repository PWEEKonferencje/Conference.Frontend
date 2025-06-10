import { useAuthStore } from "./auth.store";

export const useIsAuthenticated = () =>
  useAuthStore((s) => s.session !== undefined);

export const useIsSetupNeeded = () =>
  useAuthStore(
    (s) =>
      s.session &&
      (!s.session.details.isEmailProvided ||
        !s.session.details.isAccountSetupFinished),
  );

export const useAuthToken = () => useAuthStore((s) => s.session?.token);

export const useAccountDetails = () => useAuthStore((s) => s.session?.details);
