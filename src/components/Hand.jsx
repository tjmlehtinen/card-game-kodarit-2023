import Card from "./Card"

export default function Hand({ cards, who }) {
return (
    <ul className={`hand-list ${who}`}>
        {cards.map((c, index) => 
        <li className={`hand-list-item ${who}`}
            key={c.id}
            style={{zIndex: cards.length - index}}
        >
            <Card card={c}/>
        </li>
        )}
    </ul>
);
}