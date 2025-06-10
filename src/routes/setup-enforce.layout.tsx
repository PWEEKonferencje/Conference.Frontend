import AppNavigate from "@/components/router/AppNavigate";
import { useIsSetupNeeded } from "@/lib/auth/hooks";
import { Outlet, useLocation } from "react-router";
import { APP_ROUTES } from "./routes.enum";

export default function SetupEnforceLayout() {
  const location = useLocation();
  const isSetupNeeded = useIsSetupNeeded();

  if (!isSetupNeeded) {
    return <AppNavigate to={APP_ROUTES.ROOT} callbackUrl={location.pathname} />;
  }

  return <Outlet />;
}
