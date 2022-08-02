const { io } = require("socket.io-client");

class GameClient {
  constructor(params) {
    this._protocol = params.protocol || 'ws';
    this._ip = params.ip || 'localhost';
    this._port = params.port || '80';
    this._socket = null;
  }

  async connect(token) {
    return new Promise((resolve) => {
      const payload = {
        query: {
          token
        },
        reconnection: false
      }
      
      this._socket = io(`${this._protocol}://${this._ip}:${this._port}`, payload);
  
      this._socket.io.on("error", (error) => {
        if (error instanceof Error) {
          resolve(false);
        }
      });
  
      this._socket.on("connect", () => {
        if (this._socket.connected) {
          resolve(true);
        }
      });
    });
  }

  on(event, callback) {
    this._socket.on(event, callback);
  }
}

module.exports = GameClient;