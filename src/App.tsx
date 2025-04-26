import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { AuthStoreProvider } from "./lib/auth/auth.store";
import RootPage from "./routes/root.page";
import { APP_ROUTES } from "./routes/routes.enum";
import SignInPage from "./routes/sign-in.page";
import OAuthHandlerPage from "./routes/oauth-handler.page";
import DashboardPage from "./routes/dashboard.page";
import SetupPage from "./routes/setup/setup.page";
import SetupEmailPage from "./routes/setup/setup-email.page";
import SetupOrcidPage from "./routes/setup/setup-orcid.page";
import SetupProfilePage from "./routes/setup/setup-profile.page";

function App() {
  const router = createBrowserRouter([
    {
      path: APP_ROUTES.ROOT,
      Component: RootPage,
    },
    {
      path: APP_ROUTES.SETUP.ROOT,
      children: [
        {
          index: true,
          Component: SetupPage,
        },
        {
          path: APP_ROUTES.SETUP.EMAIL,
          Component: SetupEmailPage,
        },
        {
          path: APP_ROUTES.SETUP.ORCID,
          Component: SetupOrcidPage,
        },
        {
          path: APP_ROUTES.SETUP.PROFILE,
          Component: SetupProfilePage,
        },
      ],
    },
    {
      path: APP_ROUTES.SIGN_IN,
      Component: SignInPage,
    },
    {
      path: APP_ROUTES.OAUTH_HANDLER,
      Component: OAuthHandlerPage,
    },
    {
      path: APP_ROUTES.DASHBOARD,
      Component: DashboardPage,
    },
  ]);

  return (
    <AuthStoreProvider>
      <RouterProvider router={router} />
    </AuthStoreProvider>
  );
}

export default App;
