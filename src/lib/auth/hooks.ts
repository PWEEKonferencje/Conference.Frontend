import { useAuthStore } from "./auth.store";

export const useIsAuthenticated = () =>
  useAuthStore((s) => s.authToken !== undefined);

export const useIsSetupNeeded = () =>
  useAuthStore(
    (s) =>
      s.accountDetails &&
      (!s.accountDetails.isEmailProvided ||
        !s.accountDetails.isAccountSetupFinished),
  );

export const useAuthToken = () => useAuthStore((s) => s.authToken);

export const useAccountDetails = () => useAuthStore((s) => s.accountDetails);
