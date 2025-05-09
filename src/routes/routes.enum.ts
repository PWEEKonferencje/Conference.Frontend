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
  DASHBOARD: {
    ROOT: "/dashboard",
    CONFERENCE: {
      CREATE: "/dashboard/conference/create",
      LIST: "/dashboard/conference/list",
      VIEW: {
        ROOT: "/dashboard/conference/view",
        PAPER: {
          ROOT: "/dashboard/conference/view/paper",
        },
      },
    },
  },
  INVITATION: "/invitation",
} as const;
