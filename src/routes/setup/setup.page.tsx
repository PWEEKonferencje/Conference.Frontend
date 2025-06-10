import { useNavigate } from "react-router";
import { APP_ROUTES } from "../routes.enum";
import { useEffect, useState } from "react";
import { ApiRoutes, useApiClient } from "@/api-client";

export default function SetupPage() {
  const navigate = useNavigate();
  const apiClient = useApiClient();
  const [setupInfo, setSetupInfo] = useState<
    | ApiRoutes["/api/Profile/setupinfo"]["get"]["responses"]["200"]["content"]["application/json"]
    | null
  >(null);

  useEffect(() => {
    apiClient
      .GET("/api/Profile/setupinfo")
      .then(({ data, error }) => {
        if (error) {
          throw new Error("Error");
        }

        setSetupInfo(data);
      })
      .catch((err) => {
        throw err;
      });
  }, [apiClient]);

  useEffect(() => {
    if (setupInfo == null) {
      return;
    }

    if (setupInfo.isEmailProvided === false) {
      void navigate(APP_ROUTES.SETUP.EMAIL);
    } else if (setupInfo.isOrcidProvided === false) {
      void navigate(APP_ROUTES.SETUP.ORCID);
    } else if (setupInfo.isAccountSetupFinished === false) {
      void navigate(APP_ROUTES.SETUP.PROFILE);
    } else {
      void navigate(APP_ROUTES.ROOT);
    }
  }, [navigate, setupInfo]);

  return null;
}
