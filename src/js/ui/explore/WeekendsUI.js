import Component from "../base/Component.js";
import Destination from "../dashboard/Destination.js";

export default class WeekendsUI extends Component {
  static country;
  static weekends;

  constructor(store) {
    super(store);
    this.store = store;
    this.getData();
    // my plans
  }

  async getData() {
        const overlay = document.getElementById("loading-overlay");
    try{
      if (Destination.yearSelectedOption && Destination.countryOption) {
        overlay.classList.remove("hidden");

        await this.getCities().then((list) => {
          if (list) {
            this.selectionTagActive(...list);
          } else {
            return "Not Found";
          }
        });
        await this.getWeekends(
          Destination.yearSelectedOption,
          Destination.countryOption,
        ).then((list) => {
          if (list) {
            this.cardsState(list);
            this.initCardPlanBtn(list);
          } else {
            throw new Error()
          }
        }).catch((e)=>{
          this.errorState()
        })
      }
    }catch(e){

    }finally{
        this.hideOverlay(overlay)
    }
  }

  async getCities() {
    return await this.store.dashboard.cities;
  }
  async getWeekends(year, code) {
    return await this.store.weekends.getLongWeekends(year, code);
  }

  render() {
    this.setHeader("Long Weekends", "Find the perfect mini-trip opportunities");
    this.el = `
      <section id="long-weekends-view" class="view active">
            <div class="view-header-card gradient-orange">
              <div class="view-header-icon">
                <i class="fa-solid fa-umbrella-beach"></i>
              </div>
              <div class="view-header-content">
                <h2>Long Weekend Finder</h2>
                <p>
                  Find holidays near weekends - perfect for planning mini-trips!
                </p>
              </div>
              <div class="view-header-selection" id="weekends-selection">
              ${this.selectionTagState()}

              </div>
            </div>

            <div id="lw-content" class="lw-grid">
              ${this.currentState()}

            </div>
          </section>
    `;

    return this.el;
  }
  hideOverlay(overlay){
    overlay.classList.add("hidden")
  }
  currentState() {
    return this.emptyState();
  }
  errorState(){
   document.getElementById("lw-content").innerHTML = `
    <div class="empty-state">
        <div class="empty-icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M160 0c17.7 0 32 14.3 32 32V64H320V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H32V112c0-26.5 21.5-48 48-48h48V32c0-17.7 14.3-32 32-32zM32 192H480V464c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V192zM337 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47z"></path></svg></i></div>
        <h3>No Weekends Found</h3>
        <p>No long weekends found for ${Destination.yearSelectedOption}</p>
      </div>`
  }  
  emptyState() {
    return `
          <div class="empty-state">
              <div class="empty-icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-umbrella-beach" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="umbrella-beach" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"></path></svg></i></div>
              <h3>No Country Selected</h3>
              <p>Select a country from the dashboard to discover long weekend opportunities</p>
              <button class="btn btn-primary" onclick="navigateTo('dashboard')">
                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-globe" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"></path></svg></i>
                Go to Dashboard
              </button>
            </div>
    `;
  }


  // startDate endDate needBridgeDay dayCount bridgeDays
  cardsState(list) {
    document.getElementById('lw-content').innerHTML= list.map((card,index)=>{ 
                const start = this.formateDate(card.startDate);
                const end = this.formateDate(card.endDate);
                const  daysList = this.getDaysBetween(card.startDate, card.endDate)
                

      return `
                    <div class="lw-card">
                  <div class="lw-card-header">
                    <span class="lw-badge"
                      ><i class="fa-solid fa-calendar-days"></i> ${card.dayCount} Days</span
                    >
                    <button class="holiday-action-btn lw-action-btn">
                      <i class="fa-regular fa-heart"></i>
                    </button>
                  </div>
                  <h3>Long Weekend #${index+1}</h3>
                  <div class="lw-dates">
                    <i class="fa-regular fa-calendar"></i> ${start.month} ${start.dayNum} - ${end.month} ${end.dayNum}, ${Destination.yearSelectedOption}
                  </div>
              ${        
                    card.needBridgeDay?`<div class="lw-info-box warning">
                      <i class="fa-solid fa-circle-info"></i>Requires taking a bridge day off</div>`:          
                    `<div class="lw-info-box success">
                        <i class="fa-solid fa-check-circle"></i> No extra days off needed!
                    </div>`
                }
                  <div class="lw-days-visual">
                    ${
                      daysList.map((day)=>{
                        return `<div class="lw-day ${this.getRandomBoolean()?'weekend':''}">
                        <span class="name">${day[0]}</span><span class="num">${day[1]}</span>
                      </div>`
                      })
                    }
                    

                  </div>
                </div>`;



    }).toString().replaceAll(',','')

                    //     <div class="lw-day">
                    //   <span class="name">Thu</span><span class="num">1</span>
                    // </div>
                    // <div class="lw-day weekend">
                    //   <span class="name">Fri</span><span class="num">2</span>
                    // </div>
  }

  selectionTagState() {
    return "";
  }

  selectionTagActive(country) {
    document.getElementById("weekends-selection").innerHTML = `
                    <div class="current-selection-badge">
                  <img
                    src="https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png"
                    alt="${country.name.common}"
                    class="selection-flag"
                  />
                  <span>${country.name.common}</span>
                  <span class="selection-year">${Destination.yearSelectedOption}</span>
                </div>
    `;
    document.getElementById("weekends-selection").style.display = "flex";
  }
  initCardPlanBtn(list) {
    Array.from(document.querySelectorAll(".lw-action-btn ")).map(
      (btn, index) => {
        btn.addEventListener("click", () => {
          const { month, weekday, dayNum } = this.formateDate(list[index].date);
          list[index].month = month;
          list[index].weekday = weekday;
          list[index].dayNum = dayNum;
          list[index].category = "weekend";
          console.log('hi', list[index])
          // add it myplanList
        });
      },
    );
  }
    formateDate(dateInfo){
      const date = new Date(dateInfo); 
      const month = date.toLocaleString("en-US", { month: "short" }); 
      const day = date.toLocaleString("en-US", { weekday: "short" }); 
      const dayNumber = date.getDate(); 
      const weekday = date.toLocaleString("en-US", { weekday: "long" }); 
      return {'month':month,'weekday':weekday,'dayNum':dayNumber,'day':day}

  }

  
 getDaysBetween(startDateStr, endDateStr) {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const result = [];

  // Loop from start to end
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const weekday = days[d.getDay()];
    const dayNum = d.getDate();
    result.push([weekday, dayNum]); 
  }

  return result;
}
 getRandomBoolean() { return Math.random() < 0.5; }

}
