import Component from "../base/Component.js";
import Destination from "../dashboard/Destination.js";


export default class HolidaysUI extends Component {
  // static countries;
  static country;
  static holidays;

  constructor(store){
    super(store)
    this.store = store;
    this.getData()
    // my plans

  }

  async getData(){
    // await this.getCountries().then((list)=>{
    //   if(list){
    //     console.log(list)
        
    //   }else{
    //     return 'Not Found'
    //   }
    // })
    await this.getCities().then((list)=>{
      if(list){
        // console.log(list)
        this.selectionTagActive(...list)
      }else{
        return 'Not Found'
      }
    })
    // console.log(Destination.yearSelectedOption , Destination.countryOption)
    if(Destination.yearSelectedOption && Destination.countryOption){
      await this.getHolidays(Destination.yearSelectedOption , Destination.countryOption).then((list)=>{
        if(list){
          // console.log(list)
          
          this.withDataState(list);
          this.initCardPlanBtn(list)
          HolidaysUI.holidays = list;
        }else{
          return 'Not Found'
        }
      })
    }


  }

  // async getCountries(){
  //   return await this.store.dashboard.countries
  // }
  async getCities(){
    return await this.store.dashboard.cities
  }
  async getHolidays(year, code){

    return await this.store.holidays.getPublicHolidays(year, code)
  }


  render() {
    // Destination.planCounter +=1
    // console.log(
    //     Destination.countryOption,
    //     Destination.capitalSelectedOption,
    //     Destination.yearSelectedOption,
    // )
    // HolidaysUI.country = Destination.currentCountry
    this.setHeader('Holidays','Explore public holidays around the world');
    this.el = `
                <section id="holidays-view" class="view active">
            <div class="view-header-card gradient-green">
              <div class="view-header-icon">
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <div class="view-header-content">
                <h2>Public Holidays Explorer</h2>
                <p>
                  Browse public holidays for Egypt and plan your trips around
                  them
                </p>
              </div>
              <div class="view-header-selection" id="holidays-selection">
                ${
                  this.selectionTagState()
                }
              </div>
            </div>

            <div id="holidays-content" class="holidays-content">
              <!-- Static Egypt 2026 Holidays -->
                ${
                      this.currentState()
                }
            </div>
          </section>
    `;
    
    return this.el;
  }
  currentState(){
    return this.emptyState()

  }
  emptyState(){
    // document.getElementById('holidays-content').innerHTML=  
    return `<div class="empty-state">
              <div class="empty-icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M160 0c17.7 0 32 14.3 32 32V64H320V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H32V112c0-26.5 21.5-48 48-48h48V32c0-17.7 14.3-32 32-32zM32 192H480V464c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V192zM337 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47z"></path></svg></i></div>
              <h3>No Country Selected</h3>
              <p>Select a country from the dashboard to explore public holidays</p>
              <a class="btn btn-primary" href="/#dashboard">
                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-globe" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"></path></svg></i>
                Go to Dashboard
              </a>
            </div>`
  }
  withDataState(list){
    document.getElementById('holidays-content').innerHTML= list.map((card)=>{
    const { month, weekday, dayNum} = this.formateDate(card.date);
    return `
     <div class="holiday-card">
       <div class="holiday-card-header">
         <div class="holiday-date-box">
           <span class="day">${dayNum}</span><span class="month">${month}</span>
         </div>
         <button class="holiday-action-btn" onclick="">
           <i class="fa-regular fa-heart"></i>
         </button>
       </div>
       <h3>${card.localName}</h3>
       <p class="holiday-name">${card.name}</p>
       <div class="holiday-card-footer">
         <span class="holiday-day-badge"
           ><i class="fa-regular fa-calendar"></i> ${weekday}
         </span>
         ${
          card.types.map((type)=>{
            return `<span class="holiday-type-badge">${type}</span>`
          })
         }
         
       </div>
     </div>
   `
  }).toString().replaceAll(',','')
  // console.log(  cards.toString().replaceAll(' , ',''))
  // const cardsContainer = cards.toString().replaceAll(',','')
  }
  formateDate(dateInfo){
      const date = new Date(dateInfo); 
      const month = date.toLocaleString("en-US", { month: "short" }); 
      const dayNumber = date.getDate(); 
      const weekday = date.toLocaleString("en-US", { weekday: "long" }); 
      return {'month':month,'weekday':weekday,'dayNum':dayNumber}

  }
  selectionTagState(){
    return ''
  }
  selectionTagActive(country){

    document.getElementById('holidays-selection').innerHTML = `
    <div class="current-selection-badge">
        <img
          src="https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png"
          alt="${country.name.common}"
          class="selection-flag"/>
        <span>${country.name.common}</span>
      <span class="selection-year">${Destination.yearSelectedOption}</span>
    </div>`
    document.getElementById('holidays-selection').style.display='flex'
  }

  initCardPlanBtn(list){
    Array.from(document.querySelectorAll('.holiday-action-btn ')).map((btn, index)=>{
      btn.addEventListener('click',()=>{
        const { month, weekday, dayNum} = this.formateDate(list[index].date);
        list[index].month = month;
        list[index].weekday = weekday;
        list[index].dayNum = dayNum;
        list[index].category = 'holiday';
        // add it myplanList
      })
    })
  }
}
