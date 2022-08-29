import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import "../css/App.css";
import {
  getMafiaCount,
  getDoctorCount,
  getPoliceCount,
  getTheme,
} from "../util/lib.js";
import { InitialPage } from "./InitialPage.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { createGameAndFetchId } from "../util/networkCalls.js";

function App() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [currentPage, setCurrentPage] = useState("initial");
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState("");
  const [theme, setTheme] = useState("basic");

  const createGame = async () => {
    await createGameAndFetchId(playerName, theme, setGameId);
    setCurrentPage("dashboard");
  };

  return (
    <div className={"App " + getTheme(theme)}>
      {currentPage === "dashboard" && <Dashboard gameId={gameId} />}
      {currentPage === "initial" && (
        <InitialPage
          setCurrentPage={setCurrentPage}
          setPlayerName={setPlayerName}
          setGameId={setGameId}
          setTheme={setTheme}
          onCreate={createGame}
        />
      )}
    </div>
  );
}

export default App;
