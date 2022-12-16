class LoginClient {
  constructor(params) {
    this._protocol = params.protocol || 'http';
    this._ip = params.ip || 'localhost';
    this._port = params.port || '80';
  }

  async connect(login, password) {
    const address = `${this._protocol}://${this._ip}:${this._port}/auth/`;
    const response = await this._request(address, 'POST', {
      login,
      password
    });

    return response;
  }

  async _request(address, method = 'GET', body = {}) {
    const params = {
      method,
      headers: {
        'content-type': 'application/json'
      },
      body: null
    }
    let data;

    if (method !== 'GET') {
      params.body = JSON.stringify(body);
    }

    await fetch(address, params).then(async response => {
      data = await response.json();
    }).catch(() => {
      data = {
        status: 'error',
        message: 'connection-errors.loginserver.auth'
      };
    });

    return data;
  }
}

module.exports = LoginClient;