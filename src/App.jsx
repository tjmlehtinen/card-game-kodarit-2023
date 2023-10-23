import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

const getRandomInt = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);

const getRandomCard = () => {
  return {
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
  function compareCards() {
    const playerStat = playerCards[0].stats[0].value;
    const opponentStat = opponentCards[0].stats[0].value;
    if (playerStat < opponentStat) {setResult("Lose")}
    else if (playerStat === opponentStat) {setResult("Draw")}
    else {setResult("Win")}
  }
  return (
    <>
      <h1>Korttipeli</h1>
      <div className="game">
        {playerCards.map((c) => <Card card={c}/>)}
        <div>
          <p>{result || "Press play!"}</p>
          <button type="button" onClick={compareCards}>
            Play
          </button>
        </div>
        {opponentCards.map((c) => <Card card={c}/>)}
      </div>
    </>
  );
}