import DashboardUI from "../ui/dashboard/DashboardUI.js";
import EventUI from "../ui/explore/EventUI.js";
import HolidaysUI from "../ui/explore/HolidaysUI.js";
import WeatherUI from "../ui/explore/WeatherUI.js";
import WeekendsUI from "../ui/explore/WeekendsUI.js";
import PlansUI from "../ui/personal/PlansUI.js";
import TestUI from "../ui/test/TestUI.js";
import CurrencyUI from "../ui/tools/CurrencyUI.js";
import SunTimesUI from "../ui/tools/SunTimesUI.js";

export const routes = [
  {path:'#test', UIName: (store)=>{return new TestUI(store)}},
  {path:'#dashboard', UIName: (store)=>{return new DashboardUI(store)}},
  {path:'#holidays', UIName: (store)=>{return new HolidaysUI(store)}},
  {path:'#events', UIName: (store)=>{return new EventUI(store)}},
  {path:'#weather', UIName: (store)=>{return new WeatherUI(store)}},
  {path:'#long-weekends', UIName: (store)=>{return new WeekendsUI(store)}},
  {path:'#currency', UIName: (store)=>{return new CurrencyUI(store)}},
  {path:'#sun-times', UIName: (store)=>{return new SunTimesUI(store)}},
  {path:'#my-plans', UIName: (store)=>{return new PlansUI(store)}},
]
// export const routes = [
//   {path:'#test', UIName: 'TestUI'},
//   {path:'#dashboard', UIName:'Dashboard'},
//   '#holidays',
//   '#events',
//   '#weather',
//   '#long-weekends',
//   '#currency',
//   '#sun-times',
//   '#my-plans',
// ]