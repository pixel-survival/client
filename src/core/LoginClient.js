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

        return response;
    }

    async _request(address, method = 'GET', body = {}) {
        let data;

        await fetch(address, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(async response => {
            data = await response.json();
        }).catch(() => {
            data = null;
        });

        return data;
    }
}

module.exports = LoginClient;