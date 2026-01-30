import TestAPI from "../../api/TestAPI.js"


export default class TestState {
  constructor() {
    this.testAPI = new TestAPI();
  }
}