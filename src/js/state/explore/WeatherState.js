import WeatherAPI from "../../api/WeatherAPI.js";

export default class WeatherState {
  constructor() {
    this.weatherAPI = new WeatherAPI();
    this.weather = null;
  }

  async loadWeather(city) {
    this.weather = await this.weatherAPI.getWeather(city);
  }
}