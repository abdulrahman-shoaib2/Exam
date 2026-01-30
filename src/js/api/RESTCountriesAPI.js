import BaseAPI from './BaseAPI.js'

export default class RESTCountriesAPI extends BaseAPI{
  constructor() {
    super("https://restcountries.com/v3.1");
  }
  get data() {
    return this.fetchDataFrom();
  }
  
  fetchDataFrom(endPoint,code='') {
    if(endPoint != undefined){
      // PublicHolidays, LongWeekend, AvailableCountries
      const data = this.fetchData(
        `/${endPoint}${code?`/${code.toString()}`:''}`,
      );
      return data;
    }
    throw new Error('data must be not empty but filled with year , country code')
  }
  
}
