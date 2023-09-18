import "./App.css";
import Card from "./components/Card";

const playerCard = {
  image: "http://placekitten.com/120/100",
  stats: [{name: "Cuteness", value: 30},
          {name: "Speed", value: 20}]
}

export default function App() {
  return (
    <>
      <h1>Korttipeli</h1>
      <div className="game">
        <Card card={playerCard}/>
      </div>
    </>
  );
}