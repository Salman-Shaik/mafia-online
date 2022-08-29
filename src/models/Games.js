class Games {
  constructor() {
    this.gameList = {};
  }

  setGame(id, game) {
    this.gameList[id] = game;
  }

  setPlayer(gameId, player) {
    this.getGame(id).setParticipants(player);
  }

  getPlayers(id) {
    const game = this.getGame(id);
    return game ? game.getPlayers() : [];
  }

  getGame(id) {
    return this.gameList[id];
  }
}

module.exports = Games;
