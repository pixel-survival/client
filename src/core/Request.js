class Request {
  constructor(address) {
    this._address = address;
  }

  async get(path) {
    return await this._request(`${this._address}${path}`);
  }

  async _request(address, method = 'GET', body = {}) {
    const params = {
      method,
      headers: {
        'content-type': 'application/json'
      },
      body: null
    }

    if (method !== 'GET') {
      params.body = JSON.stringify(body);
    }

    return await fetch(address, params);
  }
}

module.exports = Request;