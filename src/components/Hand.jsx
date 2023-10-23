import Card from "./Card"

export default function Hand({ cards }) {
return (
    <ul className="hand-list">
        {cards.map((c) => 
        <li className="hand-list-item" key={c.id}>
            <Card card={c}/>
        </li>
        )}
    </ul>
);
}