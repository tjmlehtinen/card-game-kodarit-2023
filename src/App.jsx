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

function suffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const deck = getCards(16);

const dealCards = () => {
  suffle(deck)
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
  const [selectedStat, setSelectedStat] = useState(0);

  if (gameState !== "game_over" &&
        (!cards.player.length || !cards.opponent.length)
  ) {
    if (cards.player.length === 0) {
      setResult("Opponent wins!");
    }
    else {
      setResult("Player wins!");
    }
    setGameState("game_over");
  }

  function compareCards() {
    setGameState("result");

    const playerStat = cards.player[0].stats[selectedStat].value;
    const opponentStat = cards.opponent[0].stats[selectedStat].value;
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

  function restartGame() {
    setGameState("play");
    setResult("");
    setCards(dealCards);
  }

  return (
    <>
      <h1>Korttipeli</h1>
      <div className="game">
        <Hand
          cards={cards.player}
          who="player"
          selectedStat={selectedStat}
          setSelectedStat={setSelectedStat}
        />
        <div className="center-area">
          <p>{result || "Press play!"}</p>
          {gameState === "play" ?
          <PlayButton
            text="Play"
            handleClick={compareCards}
          /> : gameState === "game_over" ?
          <PlayButton
            text="Restart"
            handleClick={restartGame}
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