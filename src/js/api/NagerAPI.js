// import BaseAPI from "./BaseAPI.js";

// export default class WeatherAPI extends BaseAPI {
//   getWeather(city) {
//     return this.request(`https://api.weather.com/${city}`);
//   }
// }

import BaseAPI from './BaseAPI.js'

export default class nagerAPI extends BaseAPI{
  constructor() {
    super("https://date.nager.at/api/v3");
  }

  // AvilCountries() {
  //   const countries =  this.fetchData("/AvailableCountries");
  //   return countries;
  // }
  
  fetchDataFrom(endPoint, year='', code='') {
    if(endPoint != undefined){
      // PublicHolidays, LongWeekend, AvailableCountries
      const data = this.fetchData(
        `/${endPoint}${year?`/${year.toString()}`:''}${code?`/${code.toString()}`:''}`,
      );
      return data;
    }
    throw new Error('data must be not empty but filled with year , country code')
  }
  
}
