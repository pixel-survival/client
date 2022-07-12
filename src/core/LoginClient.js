class LoginClient {
    constructor(params) {
        this._protocol = params.protocol || 'http';
        this._ip = params.ip || 'localhost';
        this._port = params.port || '80';
    }

    async auth(login, password) {
        const address = `${this._protocol}://${this._ip}:${this._port}/auth/`;
        const response = await this._request(address, 'POST', {
            login,
            password
        });

        return await response.json();
    }

    _request(address, method = 'GET', body = {}) {
        return fetch(address, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }
}

module.exports = LoginClient;