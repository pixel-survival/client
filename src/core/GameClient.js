const { io } = require("socket.io-client");

class GameClient {
  constructor(params) {
    this._protocol = params.protocol || 'ws';
    this._ip = params.ip || 'localhost';
    this._port = params.port || '80';
    this._socket = null;
  }

  connect(token) {
    const payload = {
      query: {
        token
      }
    }
    
    this._socket = io(`${this._protocol}://${this._ip}:${this._port}`, payload);
  }

  on(event, callback) {
    this._socket.on(event, callback);
  }
}

module.exports = GameClient;