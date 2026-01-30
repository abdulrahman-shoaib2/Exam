import Component from "../base/Component.js";

export default class EventUI extends Component {
  render() {
    this.setHeader('Events','Find concerts, sports, and entertainment');

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
              <div class="view-header-selection">
                <div class="current-selection-badge">
                  <img
                    src="https://flagcdn.com/w40/eg.png"
                    alt="Egypt"
                    class="selection-flag"
                  />
                  <span>Egypt</span>
                  <span class="selection-city">• Cairo</span>
                </div>
              </div>
            </div>

            <div id="events-content" class="events-grid-layout">
              <div class="event-card">
                <div class="event-card-image">
                  <img
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop"
                    alt="Jazz Night"
                  />
                  <span class="event-card-category">Music</span>
                  <button class="event-card-save">
                    <i class="fa-regular fa-heart"></i>
                  </button>
                </div>
                <div class="event-card-body">
                  <h3>Jazz Night Live in Cairo</h3>
                  <div class="event-card-info">
                    <div>
                      <i class="fa-regular fa-calendar"></i>Feb 15, 2026 at
                      20:00
                    </div>
                    <div>
                      <i class="fa-solid fa-location-dot"></i>Cairo Opera House,
                      Cairo
                    </div>
                  </div>
                  <div class="event-card-footer">
                    <button class="btn-event">
                      <i class="fa-regular fa-heart"></i> Save
                    </button>
                    <a href="#" class="btn-buy-ticket"
                      ><i class="fa-solid fa-ticket"></i> Buy Tickets</a
                    >
                  </div>
                </div>
              </div>

              <div class="event-card">
                <div class="event-card-image">
                  <img
                    src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=200&fit=crop"
                    alt="Football"
                  />
                  <span class="event-card-category">Sports</span>
                  <button class="event-card-save">
                    <i class="fa-regular fa-heart"></i>
                  </button>
                </div>
                <div class="event-card-body">
                  <h3>Football Match in Cairo</h3>
                  <div class="event-card-info">
                    <div>
                      <i class="fa-regular fa-calendar"></i>Feb 22, 2026 at
                      19:00
                    </div>
                    <div>
                      <i class="fa-solid fa-location-dot"></i>Cairo Stadium,
                      Cairo
                    </div>
                  </div>
                  <div class="event-card-footer">
                    <button class="btn-event">
                      <i class="fa-regular fa-heart"></i> Save
                    </button>
                    <a href="#" class="btn-buy-ticket"
                      ><i class="fa-solid fa-ticket"></i> Buy Tickets</a
                    >
                  </div>
                </div>
              </div>

              <div class="event-card">
                <div class="event-card-image">
                  <img
                    src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=200&fit=crop"
                    alt="Theatre"
                  />
                  <span class="event-card-category">Arts</span>
                  <button class="event-card-save">
                    <i class="fa-regular fa-heart"></i>
                  </button>
                </div>
                <div class="event-card-body">
                  <h3>Theatre Play in Cairo</h3>
                  <div class="event-card-info">
                    <div>
                      <i class="fa-regular fa-calendar"></i>Mar 5, 2026 at 21:00
                    </div>
                    <div>
                      <i class="fa-solid fa-location-dot"></i>Cairo Cultural
                      Center, Cairo
                    </div>
                  </div>
                  <div class="event-card-footer">
                    <button class="btn-event">
                      <i class="fa-regular fa-heart"></i> Save
                    </button>
                    <a href="#" class="btn-buy-ticket"
                      ><i class="fa-solid fa-ticket"></i> Buy Tickets</a
                    >
                  </div>
                </div>
              </div>

              <div class="event-card">
                <div class="event-card-image">
                  <img
                    src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=200&fit=crop"
                    alt="Symphony"
                  />
                  <span class="event-card-category">Music</span>
                  <button class="event-card-save">
                    <i class="fa-regular fa-heart"></i>
                  </button>
                </div>
                <div class="event-card-body">
                  <h3>Symphony Orchestra in Cairo</h3>
                  <div class="event-card-info">
                    <div>
                      <i class="fa-regular fa-calendar"></i>Mar 12, 2026 at
                      19:30
                    </div>
                    <div>
                      <i class="fa-solid fa-location-dot"></i>Cairo Opera House,
                      Cairo
                    </div>
                  </div>
                  <div class="event-card-footer">
                    <button class="btn-event">
                      <i class="fa-regular fa-heart"></i> Save
                    </button>
                    <a href="#" class="btn-buy-ticket"
                      ><i class="fa-solid fa-ticket"></i> Buy Tickets</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>
    `;

    return this.el;
  }
}