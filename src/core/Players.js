class Players {
  constructor() {
    this._players = [];
  }
  
  add(player) {
    if(!this.getById(player.options.custom.id)) {
      this._players.push(player);
    }
  }

  getById(playerId) {
    return this._players.find(player => player.options.custom.id === playerId);
  }
}

export default new Players();