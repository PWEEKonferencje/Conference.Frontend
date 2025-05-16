import { useIsAuthenticated, useIsSetupNeeded } from "@/lib/auth/hooks";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "./routes.enum";
import { useEffect } from "react";

export default function RootPage() {
  const navigate = useNavigate();
  const isSetupNeeded = useIsSetupNeeded();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isSetupNeeded) {
      void navigate(APP_ROUTES.SETUP.PROFILE);
    } else if (isAuthenticated) {
      void navigate(APP_ROUTES.DASHBOARD.ROOT);
    } else {
      void navigate(APP_ROUTES.SIGN_IN);
    }
  }, [isAuthenticated, isSetupNeeded, navigate]);

  return <div>Loading...</div>;
}
