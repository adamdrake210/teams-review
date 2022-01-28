export const API_ENDPOINTS = {
  // Monthly Feedbacks

  API_MONTHLY_FEEDBACK_CREATE: {
    method: "POST",
    url: "/api/monthly-feedback/create",
  },
  API_MONTHLY_FEEDBACK_UPDATE: {
    method: "PUT",
    url: "/api/monthly-feedback/update",
  },
  API_MONTHLY_FEEDBACK_LATEST: {
    method: "GET",
    url: "/api/monthly-feedback/get-latest-feedback",
  },

  // Team Members
  API_TEAM_MEMBER_CREATE: {
    method: "POST",
    url: "/api/team-members/create",
  },
  API_TEAM_MEMBER_UPDATE: {
    method: "PUT",
    url: "/api/team-members/update",
  },
  API_TEAM_MEMBER_DELETE: {
    method: "DELETE",
    url: "/api/team-members/delete",
  },

  // Teams
  API_TEAMS_GET: {
    method: "GET",
    url: "/api/teams/get",
  },
  API_TEAMS_CREATE: {
    method: "POST",
    url: "/api/teams/create",
  },
  API_TEAMS_UPDATE: {
    method: "PUT",
    url: "/api/teams/update",
  },
  API_TEAMS_DELETE: {
    method: "DELETE",
    url: "/api/teams/delete",
  },

  // User
  API_USER_GET: {
    method: "GET",
    url: "/api/user/get-me",
  },
  API_USER_UPDATE: {
    method: "PUT",
    url: "/api/user/update",
  },
  API_USER_DELETE: {
    method: "DELETE",
    url: "/api/user/delete",
  },
} as const;
