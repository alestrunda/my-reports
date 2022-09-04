import { dateToApiFormat } from "../helpers";

const API_URL = "http://178.63.13.157:8090/mock-api/api";

const mainApi = {
  getGateways: () => fetch(`${API_URL}/gateways`),

  getProjects: () => fetch(`${API_URL}/projects`),

  getUsers: () => fetch(`${API_URL}/users`),

  getReports: ({ from, to, projectId, gatewayId }) => {
    return fetch(`${API_URL}/report`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: dateToApiFormat(from),
        to: dateToApiFormat(to),
        projectId,
        gatewayId,
      }),
    });
  },
};

export default mainApi;
