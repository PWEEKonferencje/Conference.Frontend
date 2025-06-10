import { useAuthStore } from "@/lib/auth/auth.store";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { APP_ROUTES } from "./routes.enum";

export default function OAuthHandlerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const init = useAuthStore((s) => s.init);

  const toBoolean = (str: unknown) => str === "True";

  useEffect(() => {
    /* 
    This is necessary check due to weird behavior of useNavigate causing component
    rerender after navigate() is called, which overrides token to empty value. */
    if (location.pathname !== APP_ROUTES.OAUTH_HANDLER) {
      return;
    }

    console.log(location.pathname, location.search, location.hash);

    const token = location.hash.split("=")[1];
    console.log(token);
    if (!token) {
      void navigate(APP_ROUTES.ROOT, { replace: true });
      return;
    }

    init({
      token,
      details: {
        isAccountSetupFinished: toBoolean(
          searchParams.get("isAccountSetupFinished"),
        ),
        isEmailProvided: toBoolean(searchParams.get("isEmailProvided")),
      },
    });

    void navigate(APP_ROUTES.ROOT);
  }, [init, navigate, location, searchParams]);

  return <div>Logging in...</div>;
}
