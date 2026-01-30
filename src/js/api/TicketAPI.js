import BaseAPI from "./BaseAPI.js";

export default class TicketAPI extends BaseAPI {
  constructor() {
    super("https://app.ticketmaster.com/discovery/v2");
  }

  fetchDataFrom(countryCode, city, size = 20) {
    // Events
    if (countryCode != undefined) {
      const data = this.fetchData(`/events.json`, [
        "apikey=VwECw2OiAzxVzIqnwmKJUG41FbeXJk1y",
        `countryCode=${countryCode}`,
        `city=${city}`,
        `size=${size}`,
      ]);

      // `${city?`&${city.toString()}`:''}${countryCode?`&${countryCode.toString()}`:''}&${size.toString()}`
      return data;
    }
    return new Error(
      "data must be not empty but filled with year , country code",
    );
  }
  callAPI(){
    console.log('Ticket API ....')
  }
}
