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
  function compareCards() {
    console.log("nappia painettu")
  }
  return (
    <>
      <h1>Korttipeli</h1>
      <div className="game">
        <Card card={playerCard}/>
        <div>
          <button type="button" onClick={compareCards}>
            Play
          </button>
        </div>
        <Card card={opponentCard}/>
      </div>
    </>
  );
}