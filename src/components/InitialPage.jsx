import React, { useState } from "react";
import "../css/InitialPage.css";
import _ from "lodash";

export const InitialPage = ({
  setCurrentPage,
  setPlayerName,
  setGameId,
  setTheme,
  onCreate,
  onJoin,
  playerName,
  theme,
  gameId,
}) => {
  return (
    <div className="initial_page">
      <header className="initial_page_header">
        <h2>Mafia</h2>
      </header>
      <main className="initial_page_main">
        <input
          type="text"
          className="initial_page_name"
          placeholder="Name"
          onChange={({ target }) => setPlayerName(target.value)}
        />
        <select
          className="initial_page_theme"
          onChange={({ target }) => setTheme(target.value)}
        >
          <option value="default" disabled selected>
            Select Theme
          </option>
          <option value="basic">Basic</option>
          <option value="minecraft">Minecraft</option>
          <option value="got">Game of Thrones</option>
        </select>
        <button
          className="initial_page_button create"
          onClick={onCreate}
          disabled={_.isEmpty(theme) || _.isEmpty(playerName)}
        >
          Create Game
        </button>
        <section className={"initial_page_join"}>
          <input
            type="text"
            placeholder="Game ID"
            onChange={({ target }) => setGameId(target.value)}
          />
          <button
            className="join small_button"
            onClick={onJoin}
            disabled={_.isEmpty(gameId) || _.isEmpty(playerName)}
          >
            Join
          </button>
        </section>
      </main>
    </div>
  );
};
