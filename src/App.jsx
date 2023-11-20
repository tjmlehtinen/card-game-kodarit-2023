import { useState } from "react";
import "./App.css";
import Hand from "./components/Hand";
import PlayButton from "./components/PlayButton";

const getRandomInt = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);

const getRandomCard = () => {
  return {
  id: crypto.randomUUID(),
  image: "http://placekitten.com/120/100?image=" + getRandomInt(1, 16),
  stats: [{name: "Cuteness", value: getRandomInt(10, 30)},
          {name: "Stealthmode", value: getRandomInt(10, 50)},
          {name: "Speed", value: getRandomInt(10, 40)}]
  }
};

const getCards = (n) => Array(n).fill(null).map((_) => getRandomCard());

const playerCards = getCards(8);

const opponentCards = getCards(8);

export default function App() {
  const [result, setResult] = useState("");
  const [gameState, setGameState] = useState("play");

  function compareCards() {
    setGameState("result");

    const playerStat = playerCards[0].stats[0].value;
    const opponentStat = opponentCards[0].stats[0].value;
    if (playerStat < opponentStat) {setResult("Lose")}
    else if (playerStat === opponentStat) {setResult("Draw")}
    else {setResult("Win")}
  }

  function nextRound() {
    setResult("");
    setGameState("play");
  }

  return (
    <>
      <h1>Korttipeli</h1>
      <div className="game">
        <Hand cards={playerCards} who="player"/>
        <div className="center-area">
          <p>{result || "Press play!"}</p>
          {gameState === "play" ?
          <PlayButton
            text="Play"
            handleClick={compareCards}
          /> :
          <PlayButton
            text="Next"
            handleClick={nextRound}
          />}
        </div>
        <Hand cards={opponentCards} who="opponent"/>
      </div>
    </>
  );
}