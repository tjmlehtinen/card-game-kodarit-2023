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

const deck = getCards(16);

const dealCards = () => {
  const half = Math.ceil(deck.length / 2)
  return {
    player: deck.slice(0, half),
    opponent: deck.slice(half)
  }
}

export default function App() {
  const [result, setResult] = useState("");
  const [gameState, setGameState] = useState("play");
  const [cards, setCards] = useState(dealCards);

  function compareCards() {
    setGameState("result");

    const playerStat = cards.player[0].stats[0].value;
    const opponentStat = cards.opponent[0].stats[0].value;
    if (playerStat < opponentStat) {setResult("Lose")}
    else if (playerStat === opponentStat) {setResult("Draw")}
    else {setResult("Win")}
  }

  function nextRound() {
    setCards((cards) => {
      const playedCards = [cards.player[0], cards.opponent[0]];
      const player = cards.player.slice(1);
      const opponent = cards.opponent.slice(1);
      if (result === "Lose") {
        return {
          player,
          opponent: [...opponent, ...playedCards]
        }
      }
      if (result === "Win") {
        return {
          player: [...player, ...playedCards],
          opponent
        }
      }
      return cards;
    });
    setResult("");
    setGameState("play");
  }

  return (
    <>
      <h1>Korttipeli</h1>
      <div className="game">
        <Hand cards={cards.player} who="player"/>
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
        <Hand cards={cards.opponent} who="opponent"/>
      </div>
    </>
  );
}