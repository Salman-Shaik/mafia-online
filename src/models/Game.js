const Player = require("./Player.js");

class Game {
  constructor(hostName, theme) {
    this.theme = theme;
    const host = new Player(hostName, true);
    this.players = [host];
  }

  setPlayer(name) {
    const player = new Player(name, false);
    this.players.push(player);
  }

  getPlayers() {
    return this.players;
  }
}

module.exports = Game;
