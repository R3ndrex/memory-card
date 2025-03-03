import PokemonCards from "./components/PokemonCards";
import WinnerScreen from "./components/WinnerScreen";
import "./App.css";
import { useRef, useState } from "react";

function App() {
    const [points, setPoints] = useState(0);
    const [restarts, setRestarts] = useState(0);
    let ref = useRef(0);
    const [cardAmount, setCardAmount] = useState(5);
    const handleRestart = () => {
        setRestarts((prev) => ++prev);
        setPoints(0);
    };

    return (
        <>
            <header>
                <h1>Pokémon Memory Game</h1>
                <nav>
                    <div>
                        <div>{`Points: ${points}`}</div>
                        <div>{`Restarts: ${restarts}`} </div>
                    </div>

                    <div>
                        <input
                            type="number"
                            name="pokemon-amount"
                            id="pokemon-amount"
                            placeholder="Enter card amount"
                            ref={ref}
                            defaultValue={cardAmount}
                        />
                        <button
                            onClick={() => {
                                if (
                                    Number(ref.current.value) < 3 ||
                                    Number(ref.current.value) % 1 !== 0
                                )
                                    return console.error(
                                        `Can't have this card amount`
                                    );
                                setCardAmount(Number(ref.current.value));
                                setPoints(0);
                            }}
                        >
                            Set Amount
                        </button>
                        <button onClick={handleRestart}>Restart</button>
                    </div>
                </nav>
            </header>
            <main>
                <PokemonCards
                    setPoints={setPoints}
                    cardAmount={cardAmount}
                    restartAmount={restarts}
                />
                {points === cardAmount && (
                    <WinnerScreen handleRestart={handleRestart} />
                )}
            </main>
        </>
    );
}

export default App;
