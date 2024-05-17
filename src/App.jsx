import React, { useState, useEffect } from "react";

import StartScreen from "./screens/StartScreen";
// import StartMenu from "./screens/StartMenu";
import MatchScreen from "./screens/MatchScreen";

function App() {

  // These are sent as props to the "Frame" component
  const [p1Name, setP1Name] = useState("");
  const [p2Name, setP2Name] = useState("");
  const [reds, setReds] = useState(15);

  const startMatch = (playerNames, amountOfReds) => {
    setP1Name(playerNames.p1);
    setP2Name(playerNames.p2);
    setReds(amountOfReds);

    if (playerNames.p1.length === 0) {
      setP1Name("Player 1");
    }
    if (playerNames.p2.length === 0) {
      setP2Name("Player 2");
    }
    if (playerNames.p1.length > 0 && playerNames.p1 === playerNames.p2) {
      setP2Name(playerNames.p2 + " 2");
    }
    console.log("Frame started: " + playerNames.p1 + " vs " + playerNames.p2 + " with " + amountOfReds + " reds")
    setDisplay("matchScreen");
  };

  const changeName = (e) => {
    setPlayerNames({
      ...playerNames,
      [e.target.name]: e.target.value
    })
  };

  const [display, setDisplay] = useState("");

  function Display() {
    /* if (display === "startMenu") {
      return (
        <div>
          <StartMenu changeName={changeName} startMatch={startMatch} display={display} setDisplay={setDisplay} />
        </div>


      )
    } else */ if (display === "matchScreen") {
      return (
        <MatchScreen p1={p1Name} p2={p2Name} reds={reds} />
      )
    } else {
      return (
        <StartScreen startMatch={startMatch} display={display} setDisplay={setDisplay} />
      )
    }
  };

  return (
    <div className="app-wrapper">
      <Display />
    </div>
  );
}

export default App;
