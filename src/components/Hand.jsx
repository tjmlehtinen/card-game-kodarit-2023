import Card from "./Card"

export default function Hand({ cards, who }) {
return (
    <ul className={`hand-list ${who}`}>
        {cards.map((c) => 
        <li className={`hand-list-item ${who}`} key={c.id}>
            <Card card={c}/>
        </li>
        )}
    </ul>
);
}