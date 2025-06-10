import AppNavigate from "@/components/router/AppNavigate";
import { useIsAuthenticated } from "@/lib/auth/hooks";
import { Outlet, useLocation } from "react-router";
import { APP_ROUTES } from "./routes.enum";

export default function AuthEnforceLayout() {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <AppNavigate to={APP_ROUTES.ROOT} callbackUrl={location.pathname} />;
  }

  return <Outlet />;
}
