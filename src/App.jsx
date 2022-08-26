import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {getMafiaCount,getDoctorCount,getPoliceCount,getTheme} from './util/lib.js';
import {InitialPage} from './components/InitialPage.jsx';

function App() {
  const [numberOfPlayers,setNumberOfPlayers] = useState(0);
  const [currentPage,setCurrentPage] = useState("initial");
  const [playerName,setPlayerName] = useState("");
  const [gameId,setGameId] = useState("");
  const [theme,setTheme] = useState("basic");

  return (
    <div className={ "App " + getTheme(theme) }>
      <InitialPage setCurrentPage={setCurrentPage} setPlayerName={setPlayerName} setGameId={setGameId} setTheme={setTheme}/>
    </div>
  );
}

export default App;
