import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import "../css/App.css";
import {
  getMafiaCount,
  getDoctorCount,
  getPoliceCount,
  getTheme,
  getCookieValue,
  getDefaultPage,
} from "../util/lib.js";
import { InitialPage } from "./InitialPage.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { createGameAndFetchId, joinGame } from "../util/networkCalls.js";
import _ from "lodash";

function App() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [playerName, setPlayerName] = useState(getCookieValue("playerName"));
  const [gameId, setGameId] = useState(getCookieValue("gameId"));
  const [theme, setTheme] = useState(getCookieValue("theme"));
  const [currentPage, setCurrentPage] = useState(
    getDefaultPage(playerName, gameId)
  );

  const createGame = async () => {
    await createGameAndFetchId(playerName, theme, setGameId);
    setCurrentPage("dashboard");
  };

  const onJoin = async () => {
    await joinGame(playerName, gameId);
    setCurrentPage("dashboard");
  };

  return (
    <div className={"App " + getTheme(theme)}>
      {currentPage === "dashboard" && (
        <Dashboard gameId={gameId} playerName={playerName} />
      )}
      {currentPage === "initial" && (
        <InitialPage
          setCurrentPage={setCurrentPage}
          setPlayerName={setPlayerName}
          setGameId={setGameId}
          setTheme={setTheme}
          onCreate={createGame}
          onJoin={onJoin}
          playerName={playerName}
          theme={theme}
          gameId={gameId}
        />
      )}
    </div>
  );
}

export default App;
