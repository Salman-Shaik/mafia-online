const express = require("express");
const compression = require("compression");
const favicon = require("express-favicon");
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Game = require("./models/Game.js");

const getGameId = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const app = express();
app.initialize = (games) => {
  app.games = games;
};

app.use(cors());
app.use(compression());
app.use(
  express.static(path.join(__dirname, "../build"), { maxAge: 31540000000 })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

app.post("/createGame", (req, res) => {
  const games = req.app.games;
  const { host, theme } = JSON.parse(JSON.stringify(req.body));
  const gameId = getGameId(6);
  const game = new Game(host, theme);
  games.setGame(gameId, game);
  res.cookie("playerName", host);
  res.cookie("gameId", gameId);
  res.cookie("theme", theme);
  res.json({ gameId });
});

app.post("/joinGame", (req, res) => {
  const games = req.app.games;
  const { playerName, gameId } = JSON.parse(JSON.stringify(req.body));
  const game = games.getGame(gameId);
  game.setPlayer(playerName);
  const theme = game.getTheme();
  res.cookie("playerName", playerName);
  res.cookie("gameId", gameId);
  res.cookie("theme", theme);
  res.end();
});

app.get("/players", (req, res) => {
  const games = req.app.games;
  const { gameId } = req.cookies;
  const players = games.getPlayers(gameId);
  res.json({ players });
});

module.exports = app;
