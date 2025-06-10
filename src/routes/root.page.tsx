import { useIsAuthenticated, useIsSetupNeeded } from "@/lib/auth/hooks";
import { useLocation } from "react-router";
import { APP_ROUTES } from "./routes.enum";
import AppNavigate from "@/components/router/AppNavigate";

export default function RootPage() {
  const isSetupNeeded = useIsSetupNeeded();
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  console.log(location.pathname, location.search);

  if (isSetupNeeded) {
    return <AppNavigate to={APP_ROUTES.SETUP.ROOT} />;
  } else if (isAuthenticated) {
    return <AppNavigate to={APP_ROUTES.DASHBOARD.ROOT} />;
  } else {
    return <AppNavigate to={APP_ROUTES.SIGN_IN} />;
  }
}
