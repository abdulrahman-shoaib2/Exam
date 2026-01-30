import DashboardState from "./dashboard/DashboardState.js";
import HolidaysState from "./explore/HolidaysState.js";
import WeekendsState from "./explore/WeekendsState.js";
// import WeatherState from "./explore/WeatherState.js";
import PlansState from "./personal/PlansState.js";

export default class Store {
  constructor() {
    this.dashboard = new DashboardState();
    this.holidays = new HolidaysState();
    this.weekends = new WeekendsState();
    // this.travel = new WeatherState();
    this.plans = new PlansState();
  }

}