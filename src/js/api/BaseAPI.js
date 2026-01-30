class DBApi {
  #URL = null;
  constructor(url) {
    this.#URL = url;
  }
  set baseURL(url) {
    this.#URL = url;
  }
  get baseURL() {
    if (this.#URL != null) return this.#URL;
    throw new Error("there no url added");
  }

  async fetchData() {
    throw new Error("fetchData method must be implemented by subclass");
  }
}

export default class BaseAPI extends DBApi {
  #apiKey = null;
  #result = null;
  #backendResponse = null;

  constructor(url, key = null) {
    super(url);
    this.key = key;
  }

  set key(key) {
    if (typeof key === "string" || key === null) {
      this.#apiKey = key;
      return;
    }
    throw new Error("key must be a string");
  }

  get result() {
    return this.#result;
  }

  get backendResponse() {
    return this.#backendResponse;
  }

  async fetchData(path , query = false, options = { method: "GET" }) {
    try {
      if (options.method == "POST" && this.#apiKey != null) {
        options = {
          method: options.method,
          body: JSON.stringify(options.body),
          headers: {
            "x-api-key": this.#apiKey,
            "Content-Type": "application/json",
          },
        };
      }
      const response = await fetch(
        `${this.baseURL + (path ? path : "") + (query ? "?" + query.join("&") : "")}`,
        options,
      );
      if (response.ok == true) {
        // const BackendData = await response.json();
        const BackendData = response.json();
        this.#backendResponse = BackendData;
        // this.#result = BackendData.results || BackendData.result || BackendData.data;
        return (BackendData.results || BackendData.result || BackendData.data) || BackendData;
      } else {
        throw new Error("API Error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      //
    } finally {
      //
    }
  }
}
