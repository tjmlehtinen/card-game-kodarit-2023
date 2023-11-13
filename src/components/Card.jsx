export default function Card({ card }) {
    if (!card) {
        return (
            <div className="card"></div>
        );
    }
    return (
        <div className="card">
            <img className="card-image" src={card.image} />
            <ul className="stat-list">
                {card.stats.map((stat, index) =>
                <li className="stat-list-item" key={index}>
                    <span>{stat.name}</span>
                    <span>{stat.value}</span>
                </li>)}
            </ul>
        </div>
    );
}