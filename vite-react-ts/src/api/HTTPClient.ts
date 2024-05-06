export default class HTTPClient {
  private baseURL: string;

  private headers: HeadersInit;

  constructor({ baseUrl = '', projectKey = '', headers = {} }) {
    this.baseURL = baseUrl + projectKey;
    this.headers = new Headers(headers);
  }

  async fetchJson(endpoint: string, options = {}) {
    const res = await fetch(this.baseURL + endpoint, {
      ...options,
      headers: this.headers,
    });

    if (!res.ok) throw new Error(res.statusText);

    if (res.status !== 204) return res.json();

    return undefined;
  }

  get(endpoint: string, options = {}) {
    return this.fetchJson(endpoint, {
      ...options,
      method: 'GET',
    });
  }
}
