import { createContext, ReactNode, useContext, useRef } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStoreData {
  authToken?: string;
  accountDetails?: {
    isAccountSetupFinished: boolean;
    isEmailProvided: boolean;
  };
}

interface AuthStore extends AuthStoreData {
  init: (data: AuthStoreData) => void;
}

const AuthStoreContext = createContext<StoreApi<AuthStore> | undefined>(
  undefined,
);

const AuthStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi<AuthStore>>();
  storeRef.current ??= createStore<AuthStore>()(
    persist(
      (set) => ({
        authToken: undefined,
        accountDetails: undefined,
        init: (data: AuthStoreData) =>
          set({
            ...data,
          }),
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

function useAuthStore<T>(selector: (state: AuthStore) => T) {
  const store = useContext(AuthStoreContext);
  if (!store) {
    throw new Error("Missing AuthStoreProvider");
  }
  return useStore(store, selector);
}

export { AuthStoreProvider, useAuthStore };
