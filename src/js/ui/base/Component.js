export default class Component {
  constructor(store) {
    this.store = store;
    this.el = '';
  }

  render() {
    return this.el;
  }
  setHeader(title, subtitle){
    document.getElementById('page-title').innerText = title
    document.getElementById('page-subtitle').innerText =subtitle;
  }




}
