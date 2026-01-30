import Component from "../base/Component.js";
import CountryInfo from "./CountryInfo.js";

export default class Destination {
  static currentFromState;
  static selectedDestination;
  static isExploring;
  static exploringInfo;

  static countryOption ;
  static capitalSelectedOption  ;
  static yearSelectedOption  ;

  static intervalId;
  static currentCountry;

  // static planCounter = 0;

  constructor(store) {
    this.countryInfo = new CountryInfo(store);
    this.store = store;
    this.allDataNeeded();
  }

  // ======================================================================================================================================================================================================================================================================================================================================================

  async allDataNeeded() {
    await this.countriesList().then((list) => {
      this.backup = list;

      // selected Destination box if there was data selected before
      if (Destination.selectedDestination) {
        this.clearBtn();
      }

      // exploringInfo box if there was data explore before
      if (Destination.exploringInfo) {
        // console.log(Destination.currentCountry[0])
        this.renderCountryInfo(Destination.currentCountry[0]);
        this.startTime();
      }

      // if it wasn't the first time visiting the view
      if (Destination.currentFromState) {
        document.getElementById("dashboard-form-component").innerHTML =
          Destination.currentFromState;
        // this.getSelection();
        // countryOption[0].classList.add('selected')
        if (document.querySelector(".custom-select-options").innerHTML == "") {
          this.customSelect(
            list,
            "#global-country-custom",
            ".custom-select-options",
            ".custom-select",
            "#global-country",
          );

          this.customSelect(
            [2026, 2027, 2028],
            "#global-year-simple",
            ".simple-select-dropdown",
            ".simple-select",
            "#global-year",
          );
        }
        this.customSelectAction(
          "#global-country-custom",
          ".custom-select",
          "#global-country",
        );
        this.customSelectAction(
          "#global-year-simple",
          ".simple-select",
          "#global-year",
        );

        this.countrySearchInput(list);
        this.customSelectToggle();

        let countries  = Array.from(document.querySelectorAll('.custom-select-option'))
        let selectedCountry = countries.filter((option)=>{
          if(option.getAttribute('data-value') == Destination.countryOption){
            option.classList.add('selected')
            return option
          }
        })
        // this.selectOption(countries, selectedCountry[0], "#global-country");

        let years = Array.from(document.querySelectorAll("#global-year-simple .simple-select-option"));
        let selectedYear = years.filter((year)=>{
          if(year.innerText == Destination.yearSelectedOption)      return year;
        })
        this.selectOption(years, selectedYear[0], "#global-year");
        document.querySelector('#global-year-simple .simple-select-trigger .selected-text').innerText = selectedYear[0].innerText;
        
        // console.log(selectedYear)
        if (!Destination.exploringInfo) {
          this.exploreBtn();
        }
      }

      // first time or no data was set using the form
      if (!Destination.currentFromState) {
        // view start() without any form data stored
        this.emptyForm();
        this.formFunctionalities(list);
        let years = document.querySelectorAll(
          "#global-year-simple .simple-select-option",
        );
        this.selectOption(Array.from(years), years[0], "#global-year");
        Destination.countryOption = null;
        Destination.capitalSelectedOption = null;
        Destination.yearSelectedOption = 2026;
      }
    });
  }

  // selectItems() {
  //   let countryOption = Array.from(
  //     document.querySelectorAll("#global-country-custom .custom-select-option"),
  //   ).filter((item) => {
  //     return (
  //       item.children[1].innerText ==
  //       document.querySelector(
  //         "#global-country-custom .custom-select-trigger .selected-text",
  //       ).innerText
  //     );
  //   });

  //   this.selectOption(
  //     Array.from(
  //       document.querySelectorAll(
  //         "#global-country-custom .custom-select-option",
  //       ),
  //     ),
  //     countryOption[0],
  //     "#global-country",
  //   );
  // }
  async countriesList() {
    return await this.store.dashboard.countries;
  }

  async countryByCode(code) {
    if (code != "empty") {
      const x = await this.store.dashboard.getCities(code);
      return x;
    }
  }
  // async exploreCountry(country) {
  //   const x = await this.store.dashboard.getCities(country);
  //   return x;
  // }

  // ======================================================================================================================================================================================================================================================================================================================================================

  renderFormState() {
    if (!Destination.currentFromState) {
      return this.emptyForm();
    }
    if (Destination.currentFromState) {
      return Destination.currentFromState;
    }

    // if(Destination.currentCountry){
    //   // this.currentState = this.dataState(Destination.currentCountry[0])
    // }
    // console.log(Destination.currentFromState)
  }

  selectedDestinationState() {
    if (!Destination.selectedDestination)
      return this.hiddenSelectedDestination();
    if (Destination.selectedDestination)
      return Destination.selectedDestination;
  }
  countryInfoState() {
    if (!Destination.exploringInfo) return this.emptyInfo();
    if (Destination.exploringInfo)
      return Destination.exploringInfo;
  }

  clearBtn() {
    // clear btn
    let clearBtnTimeout;
    const btn = document.getElementById("clear-selection-btn");
    btn.addEventListener("click", (e) => {
      clearInterval(Destination.intervalId);
      Destination.currentCountry = null;
      Destination.exploringInfo = null;
      Destination.selectedDestination =
        this.hiddenSelectedDestination();
      this.store.dashboard.cities = null;
      Destination.currentFromState = this.emptyForm();

      Destination.countryOption = null;
      Destination.capitalSelectedOption = null;
      Destination.yearSelectedOption = 2026;

      document.getElementById("dashboard-country-info").innerHTML =
        this.countryInfoState();
      document.getElementById("selected-destination-parent").innerHTML =
        this.selectedDestinationState();
      // document.getElementById("dashboard-form-component").innerHTML =
      //   this.renderFormState();

      document
        .querySelector(`#global-country-custom .flag`)
        .classList.add("hidden");
      document.getElementById("selected-destination").classList.add("hidden");

      let years = document.querySelectorAll(
        "#global-year-simple .simple-select-option",
      );
      // console.log(years[0]);
      this.selectOption(Array.from(years), years[0], "#global-year");
        document.querySelector('#global-year-simple .simple-select-trigger .selected-text').innerText = years[0].innerText;


      Array.from(document.getElementById("global-country").children).map(
        (elm) => {
          elm.removeAttribute("selected");
        },
      );
      document.getElementById("global-city").innerHTML =
        `<option value="">Select City</option>`;
      Array.from(
        document.querySelectorAll(
          "#global-country-custom .custom-select-option",
        ),
      ).map((elm) => {
        elm.classList.remove("selected");
      });

      document.querySelector(
        "#global-city-simple .simple-select-dropdown",
      ).innerHTML =
        `<div class="simple-select-option no-results">Select a country first</div>`;
      document.querySelector(
        "#global-country-custom .selected-text",
      ).innerText = `Select Country`;
      document
        .querySelector("#global-country-custom .selected-text")
        .classList.add("placeholder");
      document.querySelector("#global-city-simple .selected-text").innerText =
        "Select City";
      document
        .querySelector("#global-city-simple .selected-text")
        .classList.add("placeholder");
      this.showToast("Selection cleared", "info");
      clearBtnTimeout = setTimeout(() => {
        this.clearToast();
      }, 5000);
      clearTimeout(clearBtnTimeout);
    });
  }

  hiddenSelectedDestination() {
    return `
                <div id='selected-destination' class='selected-destination hidden'>
                      <div class="selected-flag">
                    <img
                      id="selected-country-flag"
                      src="https://flagcdn.com/w80/eg.png"
                      alt="Egypt"
                    />
                  </div>
                  <div class="selected-info">
                    <span
                      class="selected-country-name"
                      id="selected-country-name"
                      >Egypt</span
                    >
                    <span class="selected-city-name" id="selected-city-name"
                      >• Cairo</span
                    >
                  </div>
                  <button class="clear-selection-btn" id="clear-selection-btn">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            </div>
  
    `;
  }

  emptyForm() {
    // to grap elm and use .innerHTML
    return `
                  <div class="form-group flex-2">
                    <label
                      ><i class="fa-solid fa-earth-americas"></i> Country</label
                    >
                    <select id="global-country" class="form-select hidden">
                      <!-- TODO: Populate dynamically from API -->
                    </select>
                    <div
                      class="custom-select-wrapper"
                      id="global-country-custom"
                    >
                      <div class="custom-select-trigger">
                        <span class="flag hidden"
                          ><img
                            src="https://flagcdn.com/w40/d.png"
                            alt="AR"
                            class="flag-img"
                        /></span>
                        <span class="selected-text placeholder">Select Country</span>
                        <i class="arrow" data-fa-i2svg=""
                          ><svg
                            class="svg-inline--fa fa-chevron-down"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="chevron-down"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            data-fa-i2svg=""
                          >
                            <path
                              fill="currentColor"
                              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                            ></path></svg
                        ></i>
                      </div>
                      <div class="custom-select-dropdown">
                        <div class="custom-select-search">
                          <i data-fa-i2svg=""
                            ><svg
                              class="svg-inline--fa fa-magnifying-glass"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="magnifying-glass"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              data-fa-i2svg=""
                            >
                              <path
                                fill="currentColor"
                                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                              ></path></svg
                          ></i>
                          <input
                            type="text"
                            placeholder="Search countries..."
                            autocomplete="off"
                            id="countrySearch"
                          />
                        </div>
                        <div class="custom-select-options"></div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group flex-2">
                    <label><i class="fa-solid fa-city"></i> City</label>
                    <select id="global-city" class="form-select hidden">
                      <option value="" selected>Select City</option>
                      <option value="Cairo">Cairo</option>
                      <option value="Alexandria">Alexandria</option>
                    </select>
                    <div class="simple-select-wrapper" id="global-city-simple">
                      <div class="simple-select-trigger">
                        <span class="select-icon"
                          ><i data-fa-i2svg=""
                            ><svg
                              class="svg-inline--fa fa-city"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="city"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 512"
                              data-fa-i2svg=""
                            >
                              <path
                                fill="currentColor"
                                d="M480 48c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48V96H224V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V96H112V24c0-13.3-10.7-24-24-24S64 10.7 64 24V96H48C21.5 96 0 117.5 0 144v96V464c0 26.5 21.5 48 48 48H304h32 96H592c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48H480V48zm96 320v32c0 8.8-7.2 16-16 16H528c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM240 416H208c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16zM128 400c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zM560 256c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H528c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32zM256 176v32c0 8.8-7.2 16-16 16H208c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM112 160c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h32zM256 304c0 8.8-7.2 16-16 16H208c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zM112 320H80c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16zm304-48v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM400 64c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32zm16 112v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16z"
                              ></path></svg></i
                        ></span>
                        <span class="selected-text placeholder"
                          >Select City</span
                        >
                        <i class="arrow" data-fa-i2svg=""
                          ><svg
                            class="svg-inline--fa fa-chevron-down"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="chevron-down"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            data-fa-i2svg=""
                          >
                            <path
                              fill="currentColor"
                              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                            ></path></svg
                        ></i>
                      </div>
                      <div class="simple-select-dropdown">
                        <div class="simple-select-option no-results">
                          Select a country first
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group flex-1">
                    <label><i class="fa-solid fa-calendar"></i> Year</label>
                    <select id="global-year" class="form-select hidden">
                      <option value="2026" selected>2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                    <div class="simple-select-wrapper" id="global-year-simple">
                      <div class="simple-select-trigger">
                        <span class="select-icon"
                          ><i data-fa-i2svg=""
                            ><svg
                              class="svg-inline--fa fa-calendar"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="calendar"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              data-fa-i2svg=""
                            >
                              <path
                                fill="currentColor"
                                d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"
                              ></path></svg></i
                        ></span>
                        <span class="selected-text">2026</span>
                        <i class="arrow" data-fa-i2svg=""
                          ><svg
                            class="svg-inline--fa fa-chevron-down"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="chevron-down"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            data-fa-i2svg=""
                          >
                            <path
                              fill="currentColor"
                              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                            ></path></svg
                        ></i>
                      </div>
                      <div class="simple-select-dropdown"></div>
                    </div>
                  </div>
                  <div class="form-group search-btn-group">
                    <label>&nbsp;</label>
                    <button
                      type="button"
                      id="global-search-btn"
                      class="btn btn-primary btn-explore"
                    >
                      <i class="fa-solid fa-magnifying-glass"></i>
                      <span>Explore</span>
                    </button>
                  </div>

    `;
  }
  dataState() {
    // selectOption(list, Destination.countryOption )
  }

  formFunctionalities(list) {
    //display form the list
    this.customSelect(
      list,
      "#global-country-custom",
      ".custom-select-options",
      ".custom-select",
      "#global-country",
    );
    // this.components.customSelect([],'#global-city-simple','.simple-select-dropdown', '.simple-select' );
    this.customSelect(
      [2026, 2027, 2028],
      "#global-year-simple",
      ".simple-select-dropdown",
      ".simple-select",
      "#global-year",
    );

    this.countrySearchInput(list);
    this.customSelectToggle();
    this.exploreBtn();
  }
  renderCountryInfo(currentCountryInfo) {
    this.countryInfo.renderInfo(currentCountryInfo);
  }
  emptyInfo() {
    return this.countryInfo.renderEmptyState();
  }

  exploreBtn() {
    // to make explore btn work
    // know the current country
    // display toast
    // ask to render country info
    // live time
      document
      .getElementById("global-search-btn")
      .addEventListener("click", async (e) => {
        let y;
        try {
          const selectInput = document.getElementById("global-country");
          if (selectInput.value != "empty" && selectInput.value != 'no-countries-found') {
            this.countryInfo.renderLoading();
            y = await this.countryByCode(selectInput.value);
            this.countryData = y;
            Destination.exploringInfo = document.getElementById(
              "dashboard-country-info",
            ).innerHTML;
          }else{
            this.showToast(
              `Please select a country first`,
              "warning",
            );

          }
        } catch (e) {
          this.countryInfo.renderError();
        } finally {
          if (!this.countryData) {
            Destination.currentCountry = this.countryData;
          }
          if (this.countryData) {
            Destination.currentCountry = this.countryData;

            this.showToast(
              `Exploring ${this.countryData[0].name.common}, ${this.countryData[0].capital[0]}`,
              "success",
            );

            this.renderCountryInfo(Destination.currentCountry[0]);
            this.startTime();
          }

        }
      });
    
  }
  //
  showToast(msg, type) {
    const icons = {
      success: `circle-check`,
      info: `circle-info`,
      warning: `circle-info`,
    };
    document.getElementById("toast-container").classList.remove("leaving");
    document.getElementById("toast-container").innerHTML = `
      <div class="toast ${type}">
        <i class="fa-solid fa-${icons[type]}"></i>
        <span>${msg}</span>
        <button class="toast-close" onclick="this.parentElement.style.display='none'">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>`;

    //Selection
    // cleared, Exploring Egypt, cairo
    let x = setTimeout(() => {
      this.closeToast(x);
    }, 1000);
  }
  hideToast() {
    return this.hideToast;
  }
  closeToast(x) {
    document.getElementById("toast-container").classList.add("leaving");
    let y = setTimeout(() => {
      this.clearToast(x, y);
    }, 3000);
  }
  clearToast(x, y) {
    document.getElementById("toast-container").innerHTML = "";
    document.getElementById("toast-container").classList.remove("leaving");
    clearTimeout(x);
    clearTimeout(y);
  }

  //
  startTime() {
    const time = document.getElementById("country-local-time");
    Destination.intervalId = setInterval(() => {
      if (Destination.currentCountry) {
        time.innerText = this.liveTime(
          `${Destination.currentCountry[0].region}/${Destination.currentCountry[0].capital[0]}`,
          `${Destination.currentCountry[0].region}/${Destination.currentCountry[0].name.common}`,
          Destination.currentCountry[0].timezones,
        );
      }
    }, 1000);
  }
  liveTime(timezoneByCaptial, timezoneByCountry, UTCtimezone) {
    //Argentina , Albania Australia, Barbados Barbados Barbados Brazil Bolivia Canada Switzerland Chile China Colombia  Costa RicaCuba Dominican Republic
    const now = new Date();
    let testTime;

    try {
      testTime = now.toLocaleTimeString("en-US", {
        timeZone: `${timezoneByCaptial.toLowerCase()}`,
      });
    } catch (e) {
      try {
        testTime = now.toLocaleTimeString("en-US", {
          timeZone: `${timezoneByCountry.toLowerCase()}`,
        });
      } catch (e) {
        try {
          let timezones;
          if (typeof UTCtimezone == "object") {
            timezones = UTCtimezone.map(
              (item) => `<span class="local-time-zone">${item}</span>`,
            ).join(" ");
          } else {
            timezones = UTCtimezone;
          }
          testTime = this.getLocalTimeFromUTCOffset(timezones);
        } catch (e) {}
      }
    } finally {
      return testTime;
    }

    // console.log(testTime, timezoneData);
    // e.g. "01:27:45 AM"
    // const liveTime = now.toLocaleTimeString("en-US", {
    //   timeZone: timezoneData, // replace with country timezone
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   hour12: true,
    // });
  }
  getLocalTimeFromUTCOffset(offsetStr) {
    const nowUTC = new Date();
    const match = offsetStr.match(/UTC([+-]\d{2}):?(\d{2})?/);
    if (!match) throw new Error("Invalid UTC offset format");
    const offsetHours = parseInt(match[1], 10);
    const offsetMinutes = parseInt(match[2] || "0", 10);
    const offsetMs = (offsetHours * 60 + offsetMinutes) * 60 * 1000;
    const utcTimestamp = nowUTC.getTime() + nowUTC.getTimezoneOffset() * 60000;
    const localDate = new Date(utcTimestamp + offsetMs);
    const h = localDate.getHours();
    const m = localDate.getMinutes();
    const s = localDate.getSeconds();
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    const pad = (n) => n.toString().padStart(2, "0");
    return `${pad(hour12)}:${pad(m)}:${pad(s)} ${period}`;
  }
  //
  customSelect(
    optionsList,
    parent,
    child,
    toggleText,
    selectParent,
    extraText = "",
  ) {
    const childrenElm = optionsList.map((option) => {
      return `
      ${
        toggleText.replace(".", "") == "custom-select"
          ? `<div class="${toggleText.replace(".", "") + "-option"}" data-value="${option.countryCode}" data-name="${option.name}">
            <img
              src="https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png"
              alt="${option.countryCode}"
              class="flag-img "
              onerror="this.style.display = 'none'"
              />
              <span class="country-name">${option.name}</span>
              <span class="country-code ">${option.countryCode}</span>
            </div>`
          : `<div class="${toggleText.replace(".", "") + "-option"}" data-value="${option}" data-lat="" data-lon="">${option}  ${extraText}</div>`
      }`;
    });
    if (optionsList[0].countryCode) {
      childrenElm.unshift(
        `<div class="${toggleText.replace(".", "") + "-option hidden"} placeholder" data-value="empty" data-name="empty">
        <img src="" alt="" class="flag-img hidden"/>
        <span class="">Select x</span>
        <span class=""></span>
      </div>`,
      );
    }

    const selectChildren = optionsList.map((option, index) => {
      return `
      ${
        option.countryCode
          ? `<option value="${option.countryCode}" >${option.countryCode} ${option.name}</option>`
          : `<option value="${option.toString().replaceAll(" ", "-").toLowerCase()}" ${index == 0 ? "selected" : ""}>${option}</option>`
      }`;
    });

    if (selectChildren.length > 10) {
      selectChildren.unshift(
        `<option value="empty" selected>Select ${Array.from(
          selectParent.replace("#global-", ""),
        )
          .map((char, index) => {
            return index == 0 ? char.toUpperCase() : char;
          })
          .toString()
          .replaceAll(",", "")}</option>`,
      );
    }
    this.displayComponent(selectChildren, selectParent);
    this.displayComponent(childrenElm, parent + " " + child);
    this.customSelectAction(parent, toggleText, selectParent);
  }
  countrySearchInput(countriesList) {
    const searchInput = document.getElementById("countrySearch");
    searchInput.addEventListener("input", (e) => {
      const list = Array.from(countriesList);
      const searchList = list.filter((obj) => {
        if (
          obj["name"]
            .toLowerCase()
            .includes(e.currentTarget.value.toLowerCase()) ||
          obj["countryCode"]
            .toLowerCase()
            .includes(e.currentTarget.value.toLowerCase())
        )
          return obj;
      });
      if (searchList.length != 0) {
        this.customSelect(
          searchList,
          "#global-country-custom",
          ".custom-select-options",
          ".custom-select",
          "#global-country",
        );
      } else {
        this.customSelect(
          ["No countries found"],
          "#global-country-custom",
          ".custom-select-options",
          "no-results .simple-select",
          "#global-country",
        );
      }
    });
  }
  customSelectToggle() {
    const customSelectInputList = Array.from([
      ...document.querySelectorAll(".custom-select-trigger"),
      ...document.querySelectorAll(".simple-select-trigger"),
    ]);
    customSelectInputList.forEach((customSelectInput) => {
      customSelectInput.parentElement.addEventListener("click", (e) => {
        if (
          customSelectInput.classList.contains("open") &&
          e.target != document.getElementById("countrySearch")
        ) {
          this.selectClose(
            customSelectInput,
            customSelectInput.nextElementSibling,
          );
        } else {
          this.selectOpen(
            customSelectInput,
            customSelectInput.nextElementSibling,
          );
        }
      });
    });
    document.addEventListener("click", (event) => {
      customSelectInputList.map((input) => {
        if (
          event.target != input &&
          event.target != document.getElementById("countrySearch")
        ) {
          this.selectClose(input, input.nextElementSibling);
        }
      });
    });
  }
  selectClose(toggleElm, dropdownElm) {
    toggleElm.classList.remove("open");
    dropdownElm.classList.remove("open");
  }
  // getSelection() {
  //   let capitalSelectedOption = Array.from(
  //     document.querySelectorAll("#global-city-simple .simple-select-option"),
  //   );
  //   let countrySelectedOption = Array.from(
  //     document.querySelectorAll(".custom-select-option"),
  //   ).filter((option) => {
  //     return option.classList.contains("selected");
  //   });
  //   let yearSelectedOption = Array.from(
  //     document.querySelectorAll("#global-year-simple .simple-select-option"),
  //   );

  //   this.selectOption(
  //     countrySelectedOption,
  //     countrySelectedOption[0],
  //     "#global-city",
  //   );
  //   this.selectOption(
  //     capitalSelectedOption,
  //     Destination.capitalSelectedOption,
  //     "#global-city",
  //   );
  //   this.selectOption(
  //     yearSelectedOption,
  //     Destination.yearSelectedOption,
  //     "#global-year",
  //   );
  // }

  storePageState(options) {

    Destination.currentFromState = document.getElementById(
      "dashboard-form-component",
    ).innerHTML;
    // Destination.currentFromState = document.getElementById(
    //   "dashboard-form-component",
    // ).innerHTML;
    Destination.selectedDestination = document.getElementById(
      "selected-destination-parent",
    ).innerHTML;
  }
  // open custom select
  selectOpen(toggleElm, dropdownElm) {
    toggleElm.classList.add("open");
    dropdownElm.classList.add("open");
  }

  // option when clicked 
  customSelectAction(parent, child, selectParent) {
    //custom-select-option, simple-select-option gather any option type
    let options = Array.from(
      document.querySelectorAll(`${parent} ${child}-option`),
    );

    // addeventListener for every option
    options.map((option) => {
      option.addEventListener("click", async (e) => {
        this.selectOption(options, option, selectParent);
        // console.log('options', option, selectParent)
        if (document.querySelector(`${parent} .flag-img`) != null) {
          this.clearBtn();

          document.querySelector(`${parent} .selected-text`).innerText =
            option.children[1].innerText;
          document
            .querySelector(`${parent} .selected-text`)
            .classList.remove("placeholder");
          document.querySelector(`${parent} .flag-img`).src =
            option.children[0].src;
          this.selectedDestination(
            option.children[0].src,
            option.children[1].innerText,
          );
          document.querySelector(`${parent} .flag`).classList.remove("hidden");
          let countrySelectInput = document.getElementById("global-country");
          let countryInfo;
          
          try {
            document
            .querySelector("#global-city-simple .simple-select-trigger")
            .classList.add("disabled");
            document.querySelector(
              "#global-city-simple .simple-select-trigger .selected-text",
            ).innerText = "Loading ...";
            
            countryInfo = await this.countryByCode(countrySelectInput.value);
            Destination.currentCountry = countryInfo;
            this.countryData = countryInfo;
          } catch (e) {
            countryInfo[0].capital = [`No city data available`];
          } finally {
            this.customSelect(
              countryInfo[0].capital,
              "#global-city-simple",
              ".simple-select-dropdown",
              ".simple-select",
              "#global-city",
              `(Capital)`,
            );
            document
            .querySelector(
              "#global-city-simple .simple-select-trigger .selected-text",
            )
            .classList.remove("placeholder");
            document.querySelector(
              "#global-city-simple .simple-select-trigger .selected-text",
            ).innerText = countryInfo[0].capital + ` (Capital)`;
            document.getElementById("selected-city-name").innerText =
            `• ${countryInfo[0].capital}`;
            document
            .querySelector("#global-city-simple .simple-select-trigger")
            .classList.remove("disabled");
            document
            .getElementById("selected-destination")
            .classList.remove("hidden");
            
            let citySelectInput = document.getElementById("global-city");
            Destination.capitalSelectedOption = citySelectInput.value;
            Destination.countryOption = countrySelectInput.value;
            options = Array.from(
      document.querySelectorAll(`${parent} ${child}-option`),
    );
            this.storePageState(options);
          }
        } else {
          // if (parent == "#global-year-simple") {
          // } else {
          // }
          let yearSelectInput = document.getElementById("global-year");


          Destination.yearSelectedOption = yearSelectInput.value;

          document.querySelector(`${parent} .selected-text`).innerText =
            option.innerText;
        }
      });
    });
  }

  // give the option seleced class
  selectOption(options, option, selectParent) {
    // console.log(options, option, selectParent)
    options.map((otherElm) => {
      if (option != otherElm) {
        otherElm.classList.remove("selected");
      }
    });

    option.classList.add("selected");
    this.syncOptionWithSelect(selectParent, option);
  }

  // sync the option value with the custom div
  syncOptionWithSelect(selectParent, option) {
    Array.from(document.querySelector(selectParent).children).map((child) => {
      child.removeAttribute("selected");
    });
    document
      .querySelector(`[value="${option.getAttribute("data-value")}"]`)
      .setAttribute("selected", "selected");
  }

  // selected destination box show when click on country option
  selectedDestination(flagSrc, CountryName) {
    const selectedElm = document.getElementById("selected-destination");
    const selectedCountryFlag = document.getElementById(
      "selected-country-flag",
    );
    const selectedCountryName = document.getElementById(
      "selected-country-name",
    );
    // const selectedCityName = document.getElementById('selected-city-name');

    selectedElm.classList.remove("hidden");
    selectedCountryFlag.src = flagSrc;
    selectedCountryName.innerText = CountryName;
  }

  // display children in aparent
  displayComponent(children, parent) {
    document.querySelector(`${parent}`).innerHTML = children
      .splice(",")
      .join(" ")
      .toString();
  }
}
