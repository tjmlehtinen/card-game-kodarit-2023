import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

const playerCard = {
  image: "http://placekitten.com/120/100",
  stats: [{name: "Cuteness", value: 30},
          {name: "Speed", value: 20}]
}

const opponentCard = {
  image: "http://placekitten.com/120/110",
  stats: [{name: "Cuteness", value: 20},
          {name: "Speed", value: 30}]
}

export default function App() {
  const [result, setResult] = useState("");
  function compareCards() {
    const playerStat = playerCard.stats[0].value;
    const opponentStat = opponentCard.stats[0].value;
    if (playerStat < opponentStat) {setResult("Lose")}
    else if (playerStat === opponentStat) {setResult("Draw")}
    else {setResult("Win")}
  }
  return (
    <>
      <h1>Korttipeli</h1>
      <div className="game">
        <Card card={playerCard}/>
        <div>
          <p>{result || "Press play!"}</p>
          <button type="button" onClick={compareCards}>
            Play
          </button>
        </div>
        <Card card={opponentCard}/>
      </div>
    </>
  );
}