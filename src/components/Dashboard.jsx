import React, { useState, useEffect } from "react";
import { getPlayers } from "../util/networkCalls.js";
import _ from "lodash";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "../css/Dashboard.css";

export const Dashboard = ({ gameId, playerName }) => {
  const [players, setPlayers] = useState([]);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(async () => {
    if (_.isEmpty(players)) {
      await getPlayers(gameId, setPlayers);
    }
    setInterval(async () => await getPlayers(gameId, setPlayers), 1000);
  }, [setPlayers, gameId]);

  const toggleIsPlayerReady = () => setIsPlayerReady(!isPlayerReady);
  const isCurrentPlayerHost = () => {
    const currentPlayer = players.find((player) => player.name === playerName);
    return !currentPlayer ? false : currentPlayer.isHost;
  };
  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <h2>
          {`Game Id: ${gameId} `}
          <span onClick={() => navigator.clipboard.writeText(gameId)}>
            <ContentCopyIcon />
          </span>
        </h2>
        <section className="dashboard_ready">
          {isPlayerReady ? (
            <span
              onClick={toggleIsPlayerReady}
              className="dashboard_ready_checkbox"
            >
              <CheckBoxIcon />
            </span>
          ) : (
            <span
              onClick={toggleIsPlayerReady}
              className="dashboard_ready_checkbox"
            >
              <CheckBoxOutlineBlankIcon />
            </span>
          )}
          <label for="ready" className="dashboard_ready_label">
            I'm ready
          </label>
          <br />
        </section>
      </header>
      <main className="dashboard_main">
        <h2>Players</h2>
        <section className="dashboard_players_list">
          {players.map((player, index) => {
            return (
              <h4
                className={"dashboard_player " + `gradient_${(index + 1) % 6}`}
              >
                {player.name}
              </h4>
            );
          })}
        </section>
        {isCurrentPlayerHost() && (
          <button
            className="dashboard_button"
            disabled={players.length < 6 || players.length > 20}
            onClick={() => console.log("HI")}
          >
            Start Game
          </button>
        )}
      </main>
    </div>
  );
};
