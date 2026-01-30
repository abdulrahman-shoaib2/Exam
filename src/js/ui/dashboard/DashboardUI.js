import Component from "../base/Component.js";
import Destination from "./Destination.js";

//dashboard-form-component
export default class DashboardUI extends Component {
  constructor(store) {
    super(store);
    this.searchFrom = new Destination(store);
    // my plans
    
  }



  async getData() {
    await this.getCountries().then((list) => {
      // this.searchFrom.allDataNeeded();(list)
      console.log('hi')
    });
    await this.getCities().then((list) => {
      // console.log(list);
    });
  }

  async getCountries() {
    return await this.store.dashboard.countries;
  }
  async getCities() {
    return await this.store.dashboard.cities;
  }

  render() {
    this.setHeader(
      "Dashboard",
      "Welcome back! Ready to plan your next adventure?",
    );
    // this.el.innerHTML = MyPlans.planCounter?MyPlans.planCounter
     this.el = `
          <section id="dashboard-view" class="view active">
            <!-- Stats Cards -->
            <div class="stats-grid">
              <div class="stat-card stat-primary">
                <div class="stat-icon">
                  <i class="fa-solid fa-earth-americas"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-value" id="stat-countries">90+</span>
                  <span class="stat-label">Countries Available</span>
                </div>
              </div>
              <div class="stat-card stat-success">
                <div class="stat-icon">
                  <i class="fa-solid fa-calendar-check"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-value" id="stat-holidays">17</span>
                  <span class="stat-label">Holidays This Year</span>
                </div>
              </div>
              <div class="stat-card stat-warning">
                <div class="stat-icon"><i class="fa-solid fa-star"></i></div>
                <div class="stat-content">
                  <span class="stat-value" id="stat-events">500+</span>
                  <span class="stat-label">Events Worldwide</span>
                </div>
              </div>
              <div class="stat-card stat-danger">
                <div class="stat-icon"><i class="fa-solid fa-heart"></i></div>
                <div class="stat-content">
                  <span class="stat-value" id="stat-saved">${0}</span>
                  <span class="stat-label">Saved Plans</span>
                </div>
              </div>
            </div>

            <!-- Global Country Search -->
            <div class="section-card search-section">
              <div class="section-header">
                <h2>
                  <i class="fa-solid fa-globe"></i> Select Your Destination
                </h2>
                <p class="section-subtitle">
                  Choose a country to explore holidays, events, weather, and
                  more
                </p>
              </div>
              <div class="dashboard-search-form">
                <!-- search form component -->
                <div class="search-form-row" id="dashboard-form-component">
               ${this.searchFrom.renderFormState()}
                </div>

                <!-- Selected Destination Display - STATIC EGYPT DATA -->
                <div id='selected-destination-parent'>
                ${this.searchFrom.selectedDestinationState()}
            </div>

            <!-- Country Info Section - STATIC EGYPT DATA -->
            <div
              class="section-card country-info-section"
              id="dashboard-country-info-section"
            >
              <div class="section-header">
                <h2><i class="fa-solid fa-flag"></i> Country Information</h2>
              </div>
              <div id="dashboard-country-info" class="dashboard-country-info">
              ${this.searchFrom.countryInfoState()}
              </div>
            </div>
          </section>
    `;
    return this.el;
  }
}
