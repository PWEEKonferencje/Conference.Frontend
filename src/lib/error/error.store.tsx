import { createContext, ReactNode, useContext, useRef } from "react";
import { createStore, StoreApi, useStore } from "zustand";

interface ErrorStore {
  error?: unknown;
  setError: (error: unknown) => void;
}

const ErrorStoreContext = createContext<StoreApi<ErrorStore> | undefined>(
  undefined,
);

export const ErrorStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi<ErrorStore>>();
  storeRef.current ??= createStore<ErrorStore>()((set) => ({
    error: undefined,
    setError: (error: unknown) =>
      set({
        error,
      }),
  }));

  return (
    <ErrorStoreContext.Provider value={storeRef.current}>
      {children}
    </ErrorStoreContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useErrorStore<T>(selector: (state: ErrorStore) => T) {
  const store = useContext(ErrorStoreContext);
  if (!store) {
    throw new Error("Missing ErrorStoreProvider");
  }
  return useStore(store, selector);
}
