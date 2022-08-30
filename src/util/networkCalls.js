export const createGameAndFetchId = async (playerName, theme, setGameId) => {
  await fetch("/createGame", {
    method: "post",
    body: JSON.stringify({ host: playerName, theme }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then((data) => JSON.parse(data))
    .then((body) => setGameId(body.gameId))
    .catch((e) => new TypeError(e));
};

export const getPlayers = async (gameId, setPlayers) => {
  const url = `/players?gameId=${gameId}`;
  await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then((data) => JSON.parse(data))
    .then((body) => setPlayers(body.players))
    .catch((e) => new TypeError(e));
};

export const joinGame = async (playerName, gameId) => {
  await fetch("/joinGame", {
    method: "post",
    body: JSON.stringify({ playerName, gameId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((e) => new TypeError(e));
};
