export default function Card({ card, handleSelect, selectedStat }) {
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
                <li
                    className={`stat-list-item${selectedStat === index ? " selected" : ""}`}
                    key={index}
                    onClick={() => handleSelect && handleSelect(index)}
                >
                    <span>{stat.name}</span>
                    <span>{stat.value}</span>
                </li>)}
            </ul>
        </div>
    );
}