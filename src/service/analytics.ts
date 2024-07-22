import { get } from "../http-client/analytics-client";


export const analyticsClient = {
  postAnalytics: async () => {
    const response = get('/test')

  }
}