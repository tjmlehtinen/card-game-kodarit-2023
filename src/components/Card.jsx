export default function Card() {
    return (
        <div className="card">
            <img src="http://placekitten.com/120/100" />
            <ul>
                <li>
                    <span>Cuteness:</span>
                    <span>30</span>
                </li>
                <li>
                    <span>Speed:</span>
                    <span>20</span>
                </li>
            </ul>
        </div>
    );
}