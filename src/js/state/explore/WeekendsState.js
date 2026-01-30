import NagerAPI from "../../api/NagerAPI.js";

export default class WeekendsState {
  constructor() {
    this.nagerAPI = new NagerAPI();
  }
  
    async getLongWeekends(year, code) {
    const longWeekend = await this.nagerAPI.fetchDataFrom(`LongWeekend`,year, code);
    return longWeekend
  }
}