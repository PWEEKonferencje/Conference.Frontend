export const APP_ROUTES = {
  ROOT: "/",
  SETUP: {
    ROOT: "/setup",
    EMAIL: "/setup/email",
    ORCID: "/setup/orcid",
    PROFILE: "/setup/profile",
  },
  SIGN_IN: "/sign-in",
  OAUTH_HANDLER: "/oauth/token",
  DASHBOARD: "/dashboard",
} as const;
