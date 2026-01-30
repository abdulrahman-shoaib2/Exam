import Component from "../base/Component.js";

export default class CurrencyUI extends Component {
  render() {
        this.setHeader('Currency','Convert currencies with live exchange rates');

    this.el = `
      <section id="currency-view" class="view active">
            <div class="view-header-card gradient-gold">
              <div class="view-header-icon">
                <i class="fa-solid fa-money-bill-transfer"></i>
              </div>
              <div class="view-header-content">
                <h2>Currency Converter</h2>
                <p>Convert between currencies with live exchange rates</p>
              </div>
            </div>

            <div class="currency-converter-card">
              <div class="currency-form">
                <div class="currency-input-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    id="currency-amount"
                    class="currency-amount-input"
                    value="100"
                    min="0"
                  />
                </div>

                <div class="currency-selects">
                  <div class="currency-select-group">
                    <label>From</label>
                    <select id="currency-from" class="form-select">
                      <option value="USD" selected>USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>
                  <div class="currency-swap-wrapper">
                    <button class="currency-swap-btn" id="swap-currencies-btn">
                      <i class="fa-solid fa-arrow-right-arrow-left"></i>
                    </button>
                  </div>
                  <div class="currency-select-group">
                    <label>To</label>
                    <select id="currency-to" class="form-select">
                      <option value="EGP" selected>EGP - Egyptian Pound</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="USD">USD - US Dollar</option>
                    </select>
                  </div>
                </div>

                <button class="btn-primary btn-lg" id="convert-btn">
                  <i class="fa-solid fa-calculator"></i> Convert
                </button>
              </div>

              <!-- Static Conversion Result -->
              <div id="currency-result" class="currency-result">
                <div class="conversion-display">
                  <div class="conversion-from">
                    <span class="amount">100.00</span>
                    <span class="currency-code">USD</span>
                  </div>
                  <div class="conversion-equals">
                    <i class="fa-solid fa-equals"></i>
                  </div>
                  <div class="conversion-to">
                    <span class="amount">3,090.00</span>
                    <span class="currency-code">EGP</span>
                  </div>
                </div>
                <div class="exchange-rate-info">
                  <p>1 USD = 30.90 EGP</p>
                  <small>Last updated: January 25, 2026</small>
                </div>
              </div>
            </div>

            <div class="section-card">
              <div class="section-header">
                <h2><i class="fa-solid fa-star"></i> Quick Convert</h2>
              </div>
              <div class="popular-currencies-grid" id="popular-currencies">
                <div class="popular-currency-card">
                  <img
                    src="https://flagcdn.com/w40/eu.png"
                    alt="EUR"
                    class="flag"
                  />
                  <div class="info">
                    <div class="code">EUR</div>
                    <div class="name">Euro</div>
                  </div>
                  <div class="rate">0.9200</div>
                </div>
                <div class="popular-currency-card">
                  <img
                    src="https://flagcdn.com/w40/gb.png"
                    alt="GBP"
                    class="flag"
                  />
                  <div class="info">
                    <div class="code">GBP</div>
                    <div class="name">British Pound</div>
                  </div>
                  <div class="rate">0.7900</div>
                </div>
                <div class="popular-currency-card">
                  <img
                    src="https://flagcdn.com/w40/eg.png"
                    alt="EGP"
                    class="flag"
                  />
                  <div class="info">
                    <div class="code">EGP</div>
                    <div class="name">Egyptian Pound</div>
                  </div>
                  <div class="rate">30.9000</div>
                </div>
                <div class="popular-currency-card">
                  <img
                    src="https://flagcdn.com/w40/ae.png"
                    alt="AED"
                    class="flag"
                  />
                  <div class="info">
                    <div class="code">AED</div>
                    <div class="name">UAE Dirham</div>
                  </div>
                  <div class="rate">3.6725</div>
                </div>
                <div class="popular-currency-card">
                  <img
                    src="https://flagcdn.com/w40/sa.png"
                    alt="SAR"
                    class="flag"
                  />
                  <div class="info">
                    <div class="code">SAR</div>
                    <div class="name">Saudi Riyal</div>
                  </div>
                  <div class="rate">3.7500</div>
                </div>
                <div class="popular-currency-card">
                  <img
                    src="https://flagcdn.com/w40/jp.png"
                    alt="JPY"
                    class="flag"
                  />
                  <div class="info">
                    <div class="code">JPY</div>
                    <div class="name">Japanese Yen</div>
                  </div>
                  <div class="rate">148.50</div>
                </div>
                <div class="popular-currency-card">
                  <img
                    src="https://flagcdn.com/w40/ca.png"
                    alt="CAD"
                    class="flag"
                  />
                  <div class="info">
                    <div class="code">CAD</div>
                    <div class="name">Canadian Dollar</div>
                  </div>
                  <div class="rate">1.3500</div>
                </div>
                <div class="popular-currency-card">
                  <img
                    src="https://flagcdn.com/w40/in.png"
                    alt="INR"
                    class="flag"
                  />
                  <div class="info">
                    <div class="code">INR</div>
                    <div class="name">Indian Rupee</div>
                  </div>
                  <div class="rate">83.10</div>
                </div>
              </div>
            </div>
          </section>
    `;

    return this.el;
  }
}
