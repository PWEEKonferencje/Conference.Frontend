import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { AuthStoreProvider } from "./lib/auth/auth.store";
import { ThemeProvider } from "./context/theme-provider";
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
import NotFoundPage from "./routes/not-found.page";
import InvitationPage from "./routes/invitation.page";
import ProfilePage from "./routes/dashboard/profile.page";
import IndexPage from "./routes/index.page";
import SetupConfirmPage from "./routes/setup/setup-confirm.page";
import AuthEnforceLayout from "./routes/auth-enforce.layout";
import SignOutPage from "./routes/sign-out.page";
import SetupEnforceLayout from "./routes/setup-enforce.layout";
import AboutPage from "./routes/about.page";
import ChairmanDashboardPage from "./routes/chairman/page";
import ParticipantDashboardPage from "./routes/participant/dashboard.page";
import ParticipantPapersPage from "./routes/participant/papers.page";
import ChairmanPapersPage from "./routes/chairman/papers.page";
import ChairmanParticipantsPage from "./routes/chairman/participants.page";
import ChairmanAffiliationPage from "./routes/chairman/affiliation.page";
import ChairmanSchedulePage from "./routes/chairman/schedule.page";
import ChairmanCommitteePage from "./routes/chairman/committee.page";
import ParticipantSchedulePage from "./routes/participant/schedule.page";
import ParticipantAffiliationPage from "./routes/participant/affiliation.page";
import CommitteeDashboardPage from "./routes/committee/dashboard.page";
import CommitteePapersPage from "./routes/committee/papers.page";
import CommitteeSchedulePage from "./routes/committee/schedule.page";
import CommitteeAffiliationPage from "./routes/committee/affiliation.page";
import ChairmanLayout from "./routes/chairman/layout";
import ParticipantLayout from "./routes/participant/layout";
import CommitteeLayout from "./routes/committee/layout";
import ChairmanSettingsPage from "./routes/chairman/settings.page";
import ParticipantSubmitPaperPage from "./routes/participant/submit.page";
import ParticipantReviewsPage from "./routes/participant/reviews.page";
import ReviewPaperPage from "./routes/participant/review.page";

function App() {
  const router = createBrowserRouter([
    {
      index: true,
      Component: IndexPage,
    },
    {
      path: APP_ROUTES.ROOT,
      Component: RootPage,
    },
    {
      path: APP_ROUTES.ABOUT,
      Component: AboutPage,
    },
    {
      path: APP_ROUTES.SETUP.ROOT,
      Component: SetupEnforceLayout,
      children: [
        { index: true, Component: SetupPage },
        { path: APP_ROUTES.SETUP.EMAIL, Component: SetupEmailPage },
        { path: APP_ROUTES.SETUP.ORCID, Component: SetupOrcidPage },
        { path: APP_ROUTES.SETUP.PROFILE, Component: SetupProfilePage },
        { path: APP_ROUTES.SETUP.CONFIRM, Component: SetupConfirmPage },
      ],
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
      path: APP_ROUTES.INVITATION,
      Component: InvitationPage,
    },
    {
      path: APP_ROUTES.DASHBOARD.ROOT,
      Component: AuthEnforceLayout,
      children: [
        { index: true, Component: DashboardPage },
        {
          path: APP_ROUTES.DASHBOARD.CONFERENCE.CREATE,
          Component: ConferenceCreatePage,
        },
        {
          path: APP_ROUTES.DASHBOARD.CONFERENCE.LIST,
          Component: ConferenceListPage,
        },
        { path: APP_ROUTES.DASHBOARD.PROFILE, Component: ProfilePage },
      ],
    },
    {
      path: APP_ROUTES.CHAIRMAN.ROOT,
      Component: AuthEnforceLayout,
      children: [
        {
          path: APP_ROUTES.CHAIRMAN.ROOT,
          Component: ChairmanLayout,
          children: [
            { index: true, Component: ChairmanDashboardPage },
            { path: APP_ROUTES.CHAIRMAN.PAPERS, Component: ChairmanPapersPage },
            {
              path: APP_ROUTES.CHAIRMAN.PARTICIPANTS,
              Component: ChairmanParticipantsPage,
            },
            {
              path: APP_ROUTES.CHAIRMAN.SCHEDULE,
              Component: ChairmanSchedulePage,
            },
            {
              path: APP_ROUTES.CHAIRMAN.AFFILIATION,
              Component: ChairmanAffiliationPage,
            },
            {
              path: APP_ROUTES.CHAIRMAN.COMMITTEE,
              Component: ChairmanCommitteePage,
            },
            {
              path: APP_ROUTES.CHAIRMAN.SETTINGS,
              Component: ChairmanSettingsPage,
            },
          ],
        },
      ],
    },
    {
      path: APP_ROUTES.PARTICIPANT.ROOT,
      Component: AuthEnforceLayout,
      children: [
        {
          path: APP_ROUTES.PARTICIPANT.ROOT,
          Component: ParticipantLayout,
          children: [
            { index: true, Component: ParticipantDashboardPage },
            {
              path: APP_ROUTES.PARTICIPANT.MY_PAPERS,
              Component: ParticipantPapersPage,
            },
            {
              path: APP_ROUTES.PARTICIPANT.SUBMIT_PAPER,
              Component: ParticipantSubmitPaperPage,
            },
            {
              path: APP_ROUTES.PARTICIPANT.ASSIGNED_PAPERS,
              Component: ParticipantReviewsPage,
            },
            {
              path: APP_ROUTES.PARTICIPANT.REVIEWS,
              Component: ReviewPaperPage,
            },
            {
              path: APP_ROUTES.PARTICIPANT.SCHEDULE,
              Component: ParticipantSchedulePage,
            },
            {
              path: APP_ROUTES.PARTICIPANT.AFFILIATION,
              Component: ParticipantAffiliationPage,
            },
          ],
        },
      ],
    },
    {
      path: APP_ROUTES.COMMITTEE.ROOT,
      Component: AuthEnforceLayout,
      children: [
        {
          path: APP_ROUTES.COMMITTEE.ROOT,
          Component: CommitteeLayout,
          children: [
            { index: true, Component: CommitteeDashboardPage },
            {
              path: APP_ROUTES.COMMITTEE.PAPERS,
              Component: CommitteePapersPage,
            },
            {
              path: APP_ROUTES.COMMITTEE.SCHEDULE,
              Component: CommitteeSchedulePage,
            },
            {
              path: APP_ROUTES.COMMITTEE.AFFILIATION,
              Component: CommitteeAffiliationPage,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      Component: NotFoundPage,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <AuthStoreProvider>
        <RouterProvider router={router} />
      </AuthStoreProvider>
    </ThemeProvider>
  );
}

export default App;
