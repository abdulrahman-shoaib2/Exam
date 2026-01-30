import NagerAPI from "../../api/NagerAPI.js";

export default class HolidaysState {
  constructor() {
    this.nagerAPI = new NagerAPI();
  }
  
  async getPublicHolidays(year, code) {
    const publicHolidays = await this.nagerAPI.fetchDataFrom(`PublicHolidays`,year, code);
    return publicHolidays;

  }
}