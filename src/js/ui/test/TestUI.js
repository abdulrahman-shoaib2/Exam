import Component from "../base/Component.js";

export default class TestUI extends Component {
   async render() {
    
    await this.store.test.testAPI.logHi();

    this.el.innerHTML = `
      <h2>Test</h2>
      <p>aaaaaaaahhhhhhhhhhhhhh</p>
    `;

    return this.el;
  }
}