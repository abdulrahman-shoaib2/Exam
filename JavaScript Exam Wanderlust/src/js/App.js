import Router from "./routes/Router.js";
import Store from "./state/Store.js";

class App {
  constructor() {
    this.store = new Store();
    this.router = new Router(this.store);
    this.showSideBar()
    this.headerDatetime()
  }

  init() {
    this.router.init();
  }
    showSideBar(){
    
    document.getElementById('mobile-menu-btn').addEventListener('click',()=>{

      document.getElementById('sidebar').classList.add('open')
      const sideBarOverylay = document.getElementById('sidebar-overlay');
      sideBarOverylay.classList.add('active')
      sideBarOverylay.classList.remove('hidden')
      document.addEventListener('click',(e)=>{
        if(e.target == sideBarOverylay){
                document.getElementById('sidebar').classList.remove('open')

                sideBarOverylay.classList.remove('active')
                sideBarOverylay.classList.add('hidden')

        }
      })
    })
  }
  
  headerDatetime(){
    const currentDataElm = document.getElementById('current-datetime');
    currentDataElm.innerText = this.getDate();
    setInterval(()=>{
    currentDataElm.innerText = this.getDate();
  },5000)
  }
  getDate(){
    return new Date().toLocaleString("en-US", {
      weekday: "short",   // Thu
      month: "short",     // Jan
      day: "numeric",     // 29
      hour: "2-digit",    // 06
      minute: "2-digit",  // 30
      hour12: true        // AM/PM
    })
  }
}

export default App;