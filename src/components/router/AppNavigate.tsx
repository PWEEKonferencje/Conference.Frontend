import { Navigate } from "react-router";
import { useCallbackUrl } from "./use-callback-url.hook";

interface AppNavigateProps {
  to: string;
  callbackUrl?: string;
}

export default function AppNavigate(props: AppNavigateProps) {
  const { to, callbackUrl } = props;

  const priorCallbackUrl = useCallbackUrl();
  const newCallbackUrl = callbackUrl ?? priorCallbackUrl;

  const searchParams = new URLSearchParams({
    ...(newCallbackUrl !== null ? { callbackUrl: newCallbackUrl } : {}),
  });
  return <Navigate to={`${to}?${searchParams}`} />;
}
