import Component from "../base/Component.js";

export default class PlansUI extends Component {
  render() {
        this.setHeader('My Plans','Your saved holidays and events');

    this.el = `
      <section id="my-plans-view" class="view active">
            <div class="view-header-card gradient-pink">
              <div class="view-header-icon">
                <i class="fa-solid fa-heart"></i>
              </div>
              <div class="view-header-content">
                <h2>My Saved Plans</h2>
                <p>
                  Your saved holidays, events, and trip ideas all in one place
                </p>
              </div>
              <div class="plans-actions">
                <button class="btn-white-outline" id="clear-all-plans-btn">
                  <i class="fa-solid fa-trash"></i> Clear All
                </button>
              </div>
            </div>

            <div class="plans-filter-bar">
              <button class="plan-filter active" data-filter="all">
                <i class="fa-solid fa-layer-group"></i> All
                <span class="filter-count" id="filter-all-count">0</span>
              </button>
              <button class="plan-filter" data-filter="holiday">
                <i class="fa-solid fa-calendar-check"></i> Holidays
                <span class="filter-count" id="filter-holiday-count">0</span>
              </button>
              <button class="plan-filter" data-filter="event">
                <i class="fa-solid fa-ticket"></i> Events
                <span class="filter-count" id="filter-event-count">0</span>
              </button>
              <button class="plan-filter" data-filter="longweekend">
                <i class="fa-solid fa-umbrella-beach"></i> Long Weekends
                <span class="filter-count" id="filter-lw-count">0</span>
              </button>
            </div>

            <div id="plans-content" class="plans-grid">
              <div class="empty-state">
                <div class="empty-icon">
                  <i class="fa-solid fa-heart-crack"></i>
                </div>
                <h3>No Saved Plans Yet</h3>
                <p>
                  Start exploring and save holidays, events, or long weekends
                  you like!
                </p>
                <button class="btn-primary" id="start-exploring-btn">
                  <i class="fa-solid fa-compass"></i> Start Exploring
                </button>
              </div>
            </div>
          </section>
    `;

    return this.el;
  }
}
