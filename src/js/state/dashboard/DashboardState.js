import NagerAPI from "../../api/NagerAPI.js";
import RESTCountriesAPI from "../../api/RESTCountriesAPI.js";

export default class DashboardState {
  constructor() {
    this.nagerAPI = new NagerAPI();
    this.countries = this.getAvailCountries()
  }
  
  async getCities(code){
    this.restCountriesAPI =  new RESTCountriesAPI();
    const cities = await this.restCountriesAPI.fetchDataFrom('alpha',code);
    this.cities = cities;
    return cities;
  }


  async getAvailCountries() {
    const countries = await this.nagerAPI.fetchDataFrom(`AvailableCountries`);
    return countries;
  }
  async getLongWeekend(year, code) {
    this.longWeekend = await this.nagerAPI.fetchDataFrom(`LongWeekend`,year, code);
  }
  async getPublicHolidays(year, code) {
    this.publicHolidays = await this.nagerAPI.fetchDataFrom(`PublicHolidays`,year, code);
  }
}