import BaseAPI from "./BaseAPI.js";

export default class WeatherAPI extends BaseAPI {
  getWeather(city) {
    return this.request(`https://api.weather.com/${city}`);
  }
}