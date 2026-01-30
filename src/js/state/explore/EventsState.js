import TicketAPI from "../../api/TicketAPI.js";


export default class EventsState{
  constructor(){
    this.eventsAPI = new TicketAPI();
  }

  async getEventsInfo(countryCode, city, size){
    const  events = await this.eventsAPI.fetchDataFrom(countryCode, city, size);

    return events
  }
  call(){
    this.eventsAPI.callAPI()
  }

}