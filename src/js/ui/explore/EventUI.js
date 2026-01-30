import Component from "../base/Component.js";
import Destination from "../dashboard/Destination.js";

export default class EventUI extends Component {
  static country;
  static events;

  constructor(store) {
    super(store);
    // console.log(Destination.countryOption, Destination.capital);
    this.store = store;
    this.getData();
    this.view = this.emptyState();
  }

  async getCities() {
    return await this.store.dashboard.cities;
  }

  async getEvents(countryCode, city, size) {
    return await this.store.events.getEventsInfo(countryCode, city, size);
  }

  async getData() {
    const overlay = document.getElementById("loading-overlay");
    try {
      if (Destination.countryOption && Destination.capital) {
        overlay.classList.remove("hidden");

        await this.getCities().then((list) => {
          if (list) {
            // console.log(list);
            this.selectionTagActive(...list);
          } else {
            console.error("Api Error");
          }
        });

        // countryCode, city, size=20
        await this.getEvents(
          Destination.countryOption,
          Destination.capital,
        ).then((list) => {
          if (Boolean(list._embedded)) {
              // console.log('here' );
              this.withDataState(list._embedded.events);
              this.initCardPlanBtn(list._embedded.events);
              EventUI.events = list._embedded.events;
            } else {
              // document.getElementById('events-content').innerHTML = this.emptyState();
              this.errorState();
            }
          })
          .catch((e) => {
             this.errorState();
             
        });
              if(EventUI.events){
              this.fillTags(EventUI.events)

      }
      }
    } catch (e) {
    } finally {
      this.hideOverlay(overlay);


    }
  }

  hideOverlay(overlay) {
    overlay.classList.add("hidden");
  }

  render() {
    this.setHeader("Events", "Find concerts, sports, and entertainment");

    this.el = `
                <section id="events-view" class="view active">
            <div class="view-header-card gradient-purple">
              <div class="view-header-icon">
                <i class="fa-solid fa-ticket"></i>
              </div>
              <div class="view-header-content">
                <h2>Events Explorer</h2>
                <p>Discover concerts, sports, theatre and more in Cairo</p>
              </div>
              <div class="view-header-selection" id="x"></div>

            </div>

            <div id="events-content" class="events-grid-layout">
              ${this.defaultState()}
            </div>
          </section>
    `;

    return this.el;
  }
  defaultState() {
    return this.view;
  }

  withDataState(list) {
    let cartona = list.map((card, index) => {
        const {month , weekday, dayNumber, day, year } = this.formateDate(card.dates.start.localDate)
        return `
                    <div class="event-card">
                <div class="event-card-image">
                  <img
                    src="${card.images[3].url}"
                    alt="${card.name}"
                  />
                  <span class="event-card-category" id="tag-${index}"></span>
                  <button class="event-card-save">
                    <i class="fa-regular fa-heart"></i>
                  </button>
                </div>
                <div class="event-card-body">
                  <h3>${card.name}</h3>
                  <div class="event-card-info">
                    <div>
                      <i class="fa-regular fa-calendar"></i>${month} ${dayNumber},- ${year} at
                      ${card.dates.start.localTime}
                    </div>
                    <div>
                      <i class="fa-solid fa-location-dot"></i>${card._embedded.venues[0].name},
                      ${card._embedded.venues[0].city.name}
                    </div>
                  </div>
                  <div class="event-card-footer">
                    <button class="btn-event">
                      <i class="fa-regular fa-heart"></i> Save
                    </button>
                    <a href="${card.url}" target="_blank" class="btn-buy-ticket"
                      ><i class="fa-solid fa-ticket"></i> Buy Tickets</a
                    >
                  </div>
                </div>
              </div>

      `;
      })
    
    document.getElementById("events-content").innerHTML = cartona.toString().replaceAll(",", "");

  }

  fillTags(list){
        list.map((card, index) => {
        let {segment} =structuredClone(card.classifications[0]);
        document.getElementById(`tag-${index}`).innerText = segment.name;
      })
  }

  emptyState() {
    return `
    <div class="empty-state">
              <div class="empty-icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-ticket" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ticket" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"></path></svg></i></div>
              <h3>No City Selected</h3>
              <p>Select a country and city from the dashboard to discover events</p>
              <a class="btn btn-primary" href='./#dashboard')">
                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-globe" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"></path></svg></i>
                Go to Dashboard
              </a>
            </div>
    `;
  }
  errorState() {
    document.getElementById("events-content").innerHTML = `
        <div class="empty-state">
            <div class="empty-icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M160 0c17.7 0 32 14.3 32 32V64H320V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H32V112c0-26.5 21.5-48 48-48h48V32c0-17.7 14.3-32 32-32zM32 192H480V464c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V192zM337 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47z"></path></svg></i></div>
            <h3>No Events Found</h3>
            <p>No No events found for ${Destination.capital}</p>
          </div>
    `;
  }

  selectionTagState() {
    return "";
  }
  selectionTagActive(country) {
    document.querySelector(".view-header-selection").innerHTML = `
    <div class="current-selection-badge">
        <img
          src="https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png"
          alt="${country.name.common}"
          class="selection-flag"/>
        <span>${country.name.common}</span>
      <span class="selection-year">${Destination.yearSelectedOption}</span>
    </div>`;
    document.querySelector(".view-header-selection").style.display = "flex";
    // console.log("done");
  }
  initCardPlanBtn(list) {
    Array.from(document.querySelectorAll(".event-card-save")).map(
      (btn, index) => {
        btn.addEventListener("click", () => {
          // const { month, weekday, dayNum } = this.formateDate(list[index].date);
          // list[index].month = month;
          // list[index].weekday = weekday;
          // list[index].dayNum = dayNum;
          list[index].category = "event";
          console.log(list[index])
          // add it myplanList
        });
      },
    );
  }

  formateDate(dateInfo){
      const date = new Date(dateInfo); 
      const month = date.toLocaleString("en-US", { month: "short" }); 
      const day = date.toLocaleString("en-US", { weekday: "short" }); 
      const year = date.getFullYear()
      const dayNumber = date.getDate(); 
      const weekday = date.toLocaleString("en-US", { weekday: "long" }); 
      return {'month':month,'weekday':weekday,'dayNumber':dayNumber,'day':day, 'year':year}

  }
}
