import Component from "../base/Component.js";

export default class SunTimesUI extends Component {
  render() {
        this.setHeader('Sun Times','Check sunrise and sunset times worldwide');

    this.el = `
      <section id="sun-times-view" class="view active">
            <div class="view-header-card gradient-sunset">
              <div class="view-header-icon">
                <i class="fa-solid fa-sun"></i>
              </div>
              <div class="view-header-content">
                <h2>Sunrise & Sunset Times</h2>
                <p>
                  Plan your activities around golden hour - perfect for
                  photographers
                </p>
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

            <div id="sun-times-content" class="sun-times-layout">
              <div class="sun-main-card">
                <div class="sun-main-header">
                  <div class="sun-location">
                    <h2><i class="fa-solid fa-location-dot"></i> Cairo</h2>
                    <p>Sun times for your selected location</p>
                  </div>
                  <div class="sun-date-display">
                    <div class="date">January 25, 2026</div>
                    <div class="day">Saturday</div>
                  </div>
                </div>

                <div class="sun-times-grid">
                  <div class="sun-time-card dawn">
                    <div class="icon"><i class="fa-solid fa-moon"></i></div>
                    <div class="label">Dawn</div>
                    <div class="time">06:15 AM</div>
                    <div class="sub-label">Civil Twilight</div>
                  </div>
                  <div class="sun-time-card sunrise">
                    <div class="icon"><i class="fa-solid fa-sun"></i></div>
                    <div class="label">Sunrise</div>
                    <div class="time">06:42 AM</div>
                    <div class="sub-label">Golden Hour Start</div>
                  </div>
                  <div class="sun-time-card noon">
                    <div class="icon"><i class="fa-solid fa-sun"></i></div>
                    <div class="label">Solar Noon</div>
                    <div class="time">12:03 PM</div>
                    <div class="sub-label">Sun at Highest</div>
                  </div>
                  <div class="sun-time-card sunset">
                    <div class="icon"><i class="fa-solid fa-sun"></i></div>
                    <div class="label">Sunset</div>
                    <div class="time">05:24 PM</div>
                    <div class="sub-label">Golden Hour End</div>
                  </div>
                  <div class="sun-time-card dusk">
                    <div class="icon"><i class="fa-solid fa-moon"></i></div>
                    <div class="label">Dusk</div>
                    <div class="time">05:51 PM</div>
                    <div class="sub-label">Civil Twilight</div>
                  </div>
                  <div class="sun-time-card daylight">
                    <div class="icon">
                      <i class="fa-solid fa-hourglass-half"></i>
                    </div>
                    <div class="label">Day Length</div>
                    <div class="time">10h 42m</div>
                    <div class="sub-label">Total Daylight</div>
                  </div>
                </div>
              </div>

              <div class="day-length-card">
                <h3>
                  <i class="fa-solid fa-chart-pie"></i> Daylight Distribution
                </h3>
                <div class="day-progress">
                  <div class="day-progress-bar">
                    <div class="day-progress-fill" style="width: 44.6%"></div>
                  </div>
                </div>
                <div class="day-length-stats">
                  <div class="day-stat">
                    <div class="value">10h 42m</div>
                    <div class="label">Daylight</div>
                  </div>
                  <div class="day-stat">
                    <div class="value">44.6%</div>
                    <div class="label">of 24 Hours</div>
                  </div>
                  <div class="day-stat">
                    <div class="value">13h 18m</div>
                    <div class="label">Darkness</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    `;

    return this.el;
  }
}
