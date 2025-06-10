import { useNavigate } from "react-router";
import { APP_ROUTES } from "../routes.enum";
import { useEffect, useState } from "react";
import { useApiClient } from "@/api-client";

interface SetupInfo {
  isEmailProvided: boolean;
  isOrcidProvided: boolean;
  isAccountSetupFinished: boolean;
}

export default function SetupPage() {
  const navigate = useNavigate();
  const apiClient = useApiClient();
  const [setupInfo, setSetupInfo] = useState<SetupInfo | null>(null);

  useEffect(() => {
    apiClient
      .GET("/api/Profile/setupinfo")
      .then(({ data, error }) => {
        if (error) {
          throw new Error("Error");
        }

        setSetupInfo(data as SetupInfo);
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
