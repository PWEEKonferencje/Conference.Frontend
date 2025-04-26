import { useAccountDetails } from "@/lib/auth/hooks";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../routes.enum";
import { useEffect } from "react";

export default function SetupPage() {
  const navigate = useNavigate();
  const user = useAccountDetails();

  useEffect(() => {
    if (user?.isEmailProvided === false) {
      void navigate(APP_ROUTES.SETUP.EMAIL);
    } else if (user?.isAccountSetupFinished === false) {
      void navigate(APP_ROUTES.SETUP.ORCID);
    } else {
      void navigate(APP_ROUTES.ROOT);
    }
  }, [navigate, user]);

  return null;
}
