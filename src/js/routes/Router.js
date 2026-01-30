import { routes } from "./Routes.js";

export default class Router {
  constructor(store) {
    this.store = store;
    this.appRoot = document.getElementById("main-content");
  }

  init() {
    window.addEventListener("hashchange", (e) => {
      e.preventDefault();
      this.loadPage();
    });
    this.loadPage();
  }

  loadPage() {
    const currentRoute = location.hash || "#dashboard";
    // render correct component

    // All Routes do something
    // routes.map((route)=>{
    //   if (currentRoute === route) {
    //     const page = new TestUI(this.store);
    //     page.render().then(el => this.appRoot.appendChild(el));
    //   }
    // })

    this.clearApp();
    routes.map((route) => {
      if (currentRoute === route.path) {
        // const testPage = new TestUI(this.store);
        const testPage = route.UIName(this.store);
        try {
          this.sidenav(route.path);
          this.appRoot.innerHTML = testPage.render();
        } catch (e) {
          try {
            testPage.render().then((el) => this.appRoot.innerHTML =el);
          } catch (e) {}
        }
      }
    });
    // switch (currentRoute) {
    //   case '#dashboard':
    //     const dashboardPage = new TestUI(this.store);
    //     dashboardPage.render().then((el) => this.appRoot.appendChild(el));
    //     break;
    //   case '#holidays':
    //     const holidaysPage = new TestUI(this.store);
    //     holidaysPage.render().then((el) => this.appRoot.appendChild(el));
    //     break;
    //   case '#events':
    //     const eventsPage = new TestUI(this.store);
    //     eventsPage.render().then((el) => this.appRoot.appendChild(el));
    //     break;
    //   case '#weather':
    //     const weatherPage = new TestUI(this.store);
    //     weatherPage.render().then((el) => this.appRoot.appendChild(el));
    //     break;
    //   case '#long-weekends':
    //     const longWeekendsPage = new TestUI(this.store);
    //     longWeekendsPage.render().then((el) => this.appRoot.appendChild(el));
    //     break;
    //   case '#currency':
    //     const currencyPage = new TestUI(this.store);
    //     currencyPage.render().then((el) => this.appRoot.appendChild(el));
    //     break;
    //   case '#sun-times':
    //     const sunTimesPage = new TestUI(this.store);
    //     sunTimesPage.render().then((el) => this.appRoot.appendChild(el));
    //     break;
    //   case '#my-plans':
    //     const plansPage = new TestUI(this.store);
    //     plansPage.render().then((el) => this.appRoot.appendChild(el));
    //     break;

    //   default:
    //     break;
    // }
  }
  sidenav(routePath) {
    Array.from(document.querySelectorAll(`.nav-item`)).map((elm) => {
      if (
        document.querySelector(`[href="${routePath}"]`).innerText !=
        elm.innerText
      ) {
        elm.classList.remove("active");
      }
    });
    document.querySelector(`[href="${routePath}"]`).classList.add("active");
  }
  clearApp() {
    this.appRoot.innerHTML = "";
  }
}
