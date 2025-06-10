export const APP_ROUTES = {
  INDEX: "/",
  ROOT: "/root",
  ABOUT: "/about",
  SETUP: {
    ROOT: "/setup",
    EMAIL: "/setup/email",
    ORCID: "/setup/orcid",
    PROFILE: "/setup/profile",
    CONFIRM: "/setup/confirm",
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
    PROFILE: "/dashboard/profile",
  },
  INVITATION: "/invitation",
} as const;
