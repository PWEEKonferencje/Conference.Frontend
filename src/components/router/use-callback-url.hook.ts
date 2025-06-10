import { useLocation } from "react-router";

export function useCallbackUrl() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const callbackUrl = searchParams.get("callbackUrl");

  return callbackUrl;
}
