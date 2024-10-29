import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch";

export class CalendarService {
  private client: Client;

  constructor(accessToken: string) {
    this.client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });
  }

  async getCalendarEvents() {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString();

    try {
      const response = await this.client
        .api("/me/calendarView")
        .query({
          startDateTime: startOfDay,
          endDateTime: endOfDay,
        })
        .get();

      return response.value;
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      throw error;
    }
  }
}
