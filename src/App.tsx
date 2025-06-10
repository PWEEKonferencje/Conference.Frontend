import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { AuthStoreProvider } from "./lib/auth/auth.store";
import RootPage from "./routes/root.page";
import { APP_ROUTES } from "./routes/routes.enum";
import SignInPage from "./routes/sign-in.page";
import OAuthHandlerPage from "./routes/oauth-handler.page";
import DashboardPage from "./routes/dashboard/dashboard.page";
import SetupPage from "./routes/setup/setup.page";
import SetupEmailPage from "./routes/setup/setup-email.page";
import SetupOrcidPage from "./routes/setup/setup-orcid.page";
import SetupProfilePage from "./routes/setup/setup-profile.page";
import ConferenceCreatePage from "./routes/dashboard/conference/create.page";
import ConferenceListPage from "./routes/dashboard/conference/list.page";
import ConferenceViewPage from "./routes/dashboard/conference/view.page";
import NotFoundPage from "./routes/not-found.page";
import ConferencePaperViewPage from "./routes/dashboard/conference/view/paper/view.page";
import InvitationPage from "./routes/invitation.page";
import ProfilePage from "./routes/dashboard/profile.page";
import AuthEnforceLayout from "./routes/auth-enforce.layout";
import SignOutPage from "./routes/sign-out.page";
import SetupEnforceLayout from "./routes/setup-enforce.layout";

function App() {
  const router = createBrowserRouter([
    {
      path: APP_ROUTES.ROOT,
      Component: RootPage,
    },
    {
      path: APP_ROUTES.SIGN_IN,
      Component: SignInPage,
    },
    {
      path: APP_ROUTES.SIGN_OUT,
      Component: SignOutPage,
    },
    {
      path: APP_ROUTES.OAUTH_HANDLER,
      Component: OAuthHandlerPage,
    },
    {
      Component: AuthEnforceLayout,
      children: [
        {
          Component: SetupEnforceLayout,
          children: [
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
          ],
        },
        {
          path: APP_ROUTES.DASHBOARD.ROOT,
          Component: DashboardPage,
          children: [
            {
              path: APP_ROUTES.DASHBOARD.CONFERENCE.CREATE,
              Component: ConferenceCreatePage,
            },
            {
              path: APP_ROUTES.DASHBOARD.CONFERENCE.LIST,
              Component: ConferenceListPage,
            },
            {
              path: APP_ROUTES.DASHBOARD.CONFERENCE.VIEW.ROOT,
              Component: ConferenceViewPage,
            },
            {
              path: APP_ROUTES.DASHBOARD.CONFERENCE.VIEW.PAPER.ROOT,
              Component: ConferencePaperViewPage,
            },
            {
              path: APP_ROUTES.DASHBOARD.PROFILE,
              Component: ProfilePage,
            },
          ],
        },
        {
          path: APP_ROUTES.INVITATION,
          Component: InvitationPage,
        },
      ],
    },
    {
      path: "*",
      Component: NotFoundPage,
    },
  ]);

  return (
    <AuthStoreProvider>
      <RouterProvider router={router} />
    </AuthStoreProvider>
  );
}

export default App;
