import { createContext, ReactNode, useContext, useRef } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface AuthStoreData {
  session?: {
    token: string;
    details: {
      isAccountSetupFinished: boolean;
      isEmailProvided: boolean;
    };
    exp: number;
  };
}

interface AuthStore extends AuthStoreData {
  init: (
    data: Pick<NonNullable<AuthStoreData["session"]>, "token" | "details">,
  ) => void;
  clear: () => void;
  updateAccountDetails: (
    accountDetails: Partial<NonNullable<AuthStore["session"]>["details"]>,
  ) => void;
}

const AuthStoreContext = createContext<StoreApi<AuthStore> | undefined>(
  undefined,
);

export const AuthStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi<AuthStore>>();
  storeRef.current ??= createStore<AuthStore>()(
    persist(
      (set) => ({
        authToken: undefined,
        accountDetails: undefined,
        init: (
          data: Pick<
            NonNullable<AuthStoreData["session"]>,
            "token" | "details"
          >,
        ) => {
          const { token, details } = data;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          const { exp } = jwtDecode(token);
          if (!exp) {
            throw new Error("jwt exp property is expected - found undefined");
          }

          console.log(token, details, exp);

          set({
            session: {
              token,
              exp,
              details,
            },
          });
        },
        clear: () =>
          set({
            session: undefined,
          }),
        updateAccountDetails: (
          accountDetails: Partial<NonNullable<AuthStore["session"]>["details"]>,
        ) =>
          set((state) => ({
            session: !state.session
              ? state.session
              : {
                  ...state.session,
                  details: !state.session.details
                    ? state.session.details
                    : {
                        ...state.session.details,
                        ...accountDetails,
                      },
                },
          })),
      }),
      {
        name: "auth_store",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthStore<T>(selector: (state: AuthStore) => T) {
  const store = useContext(AuthStoreContext);
  if (!store) {
    throw new Error("Missing AuthStoreProvider");
  }
  return useStore(store, selector);
}
