export const API_ENDPOINTS = {
  // Feedbacks
  API_FEEDBACKS_UPDATE: {
    method: "PUT",
    url: "/api/feedbacks/update",
  },
  API_MONTHLY_FEEDBACK_LATEST: {
    method: "GET",
    url: "/api/feedbacks/get-latest-feedback",
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
