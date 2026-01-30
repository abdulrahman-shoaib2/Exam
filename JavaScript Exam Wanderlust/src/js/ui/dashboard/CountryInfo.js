import Component from "../base/Component.js";

export default class CountryInfo extends Component {
  constructor(store){
    super(store)
    this.store =  store;
  }
   render() {
    console.log('hi')
  }
  renderEmptyState(){
    return `
      <div class="country-info-placeholder">
        <div class="placeholder-icon">
          <i data-fa-i2svg=""><svg class="svg-inline--fa fa-globe" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"></path></svg></i>
        </div>
        <p>Select a country to view detailed information</p>
      </div>
    `
  }
   renderInfo(country) {
    let tags, timezones;
    if(country.borders){
      tags = country.borders .map(item => `<span class="extra-tag border-tag">${item}</span>`) .join(' ') ; 
    } 
    if(typeof(country.timezones) ==  'object'){
      timezones = country.timezones.map(item => `<span class="local-time-zone">${item}</span>`).join(' ')
    }else{
      timezones = country.timezones
    }
    const suffixes =  country.idd.suffixes.map(num=>`${num}`).join(' ')

    document.getElementById('dashboard-country-info').innerHTML = `
                    <div class="dashboard-country-header">
                  <img
                    src="${country['flags'].svg}"
                    alt="Egypt"
                    class="dashboard-country-flag"
                  />
                  <div class="dashboard-country-title">
                    <h3>${country.name.common}</h3>
                    <p class="official-name">${country.name.official}</p>
                    <span class="region"
                      ><i class="fa-solid fa-location-dot"></i> ${country.region} •
                      ${country.subregion}</span
                    >
                  </div>
                </div>

                <div class="dashboard-local-time">
                  <div class="local-time-display">
                    <i class="fa-solid fa-clock"></i>
                    <span class="local-time-value" id="country-local-time"
                      >00:00:00 AM</span
                    >
                    <span class="local-time-zone">${timezones}</span>
                  </div>
                </div>

                <div class="dashboard-country-grid">
                  <div class="dashboard-country-detail">
                    <i class="fa-solid fa-building-columns"></i>
                    <span class="label">Capital</span>
                    <span class="value">${country.capital}</span>
                  </div>
                  <div class="dashboard-country-detail">
                    <i class="fa-solid fa-users"></i>
                    <span class="label">Population</span>
                    <span class="value">${country.population.toLocaleString()}</span>
                  </div>
                  <div class="dashboard-country-detail">
                    <i class="fa-solid fa-ruler-combined"></i>
                    <span class="label">Area</span>
                    <span class="value">${country.area.toLocaleString()} km²</span>
                  </div>
                  <div class="dashboard-country-detail">
                    <i class="fa-solid fa-globe"></i>
                    <span class="label">Continent</span>
                    <span class="value">${country.continents}</span>
                  </div>
                  <div class="dashboard-country-detail">
                    <i class="fa-solid fa-phone"></i>
                    <span class="label">Calling Code</span>
                    <span class="value">${country.idd.root}${suffixes}</span>
                  </div>
                  <div class="dashboard-country-detail">
                    <i class="fa-solid fa-car"></i>
                    <span class="label">Driving Side</span>
                    <span class="value " style="text-transform: capitalize;">${country.car.side}</span>
                  </div>
                  <div class="dashboard-country-detail">
                    <i class="fa-solid fa-calendar-week"></i>
                    <span class="label">Week Starts</span>
                    <span class="value " style="text-transform: capitalize;">${country.startOfWeek}</span>
                  </div>
                </div>

                <div class="dashboard-country-extras">
                  <div class="dashboard-country-extra">
                    <h4><i class="fa-solid fa-coins"></i> Currency</h4>
                    <div class="extra-tags">
                      <span class="extra-tag">${country.currencies[Object.keys(country.currencies)[0]].name} (${Object.keys(country.currencies)[0]} ${country.currencies[Object.keys(country.currencies)[0]].symbol})</span>
                    </div>
                  </div>
                  <div class="dashboard-country-extra">
                    <h4><i class="fa-solid fa-language"></i> Languages</h4>
                    <div class="extra-tags">
                      <span class="extra-tag">${country.languages[Object.keys(country.languages)[0]]}</span>
                    </div>
                  </div>
                  <div class="dashboard-country-extra">
                    <h4>
                      <i class="fa-solid fa-map-location-dot"></i> Neighbors
                    </h4>
                    <div class="extra-tags">
                      ${tags?tags:''}
                    </div>
                  </div>
                </div>

                <div class="dashboard-country-actions">
                  <a
                    href="${country.maps.googleMaps}"
                    target="_blank"
                    class="btn-map-link"
                  >
                    <i class="fa-solid fa-map"></i> View on Google Maps
                  </a>
                </div>

    `
    
  }
  renderLoading(){
    document.getElementById('dashboard-country-info').innerHTML =  `
      <div id="dashboard-country-info" class="dashboard-country-info">
    <div class="country-info-loading">
      <i data-fa-i2svg=""><svg class="svg-inline--fa fa-spinner fa-spin" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"></path></svg></i>
      <span>Loading country information...</span>
    </div>
  </div>
    `
  }
  renderError(){
    document.getElementById('dashboard-country-info').innerHTML = `<div class="country-info-placeholder">
        <div class="placeholder-icon error">
          <i data-fa-i2svg=""><svg class="svg-inline--fa fa-triangle-exclamation" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="triangle-exclamation" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg></i>
        </div>
        <p>Failed to load country information. Please try again.</p>
      </div>`
  }
}