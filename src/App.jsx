import PokemonCards from "./components/PokemonCards";
import WinnerScreen from "./components/WinnerScreen";
import "./App.css";
import { useState } from "react";

function App() {
    const [points, setPoints] = useState(0);
    const [restarts, setRestarts] = useState(0);
    const [cardAmount, setCardAmount] = useState(5);
    const [inputValue, setInputValue] = useState(cardAmount);
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
                            min={3}
                            max={50}
                            type="number"
                            name="pokemon-amount"
                            id="pokemon-amount"
                            placeholder="Enter card amount"
                            value={inputValue}
                            onChange={({ target }) => {
                                target.setCustomValidity("");
                                if (target.value % 1 !== 0) {
                                    target.setCustomValidity(
                                        "Number must be an integer"
                                    );
                                }
                                setInputValue(target.value);
                                target.reportValidity();
                            }}
                        />
                        <button
                            disabled={
                                Number(inputValue) < 3 ||
                                Number(inputValue) % 1 !== 0
                            }
                            onClick={() => {
                                setCardAmount(Number(inputValue));
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
