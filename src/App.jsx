import PokemonCards from "./components/PokemonCards";
import WinnerScreen from "./components/WinnerScreen";
import "./App.css";
import { useRef, useState } from "react";

function App() {
    const [points, setPoints] = useState(0);
    const [restarts, setRestarts] = useState(0);
    let ref = useRef(0);
    const [pokemonAmount, setPokemonAmount] = useState(5);
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
                        {" "}
                        <div>{`Points: ${points}`}</div>
                        <div>{`Restarts: ${restarts}`} </div>
                    </div>

                    <div>
                        <input
                            type="number"
                            name="pokemon-amount"
                            id="pokemon-amount"
                            ref={ref}
                            defaultValue={pokemonAmount}
                        />
                        <button
                            onClick={() => setPokemonAmount(ref.current.value)}
                        >
                            Set Amount
                        </button>
                        <button onClick={handleRestart}>Restart</button>
                    </div>
                </nav>
            </header>

            <PokemonCards
                setPoints={setPoints}
                pokemonAmount={pokemonAmount}
                restartAmount={restarts}
            />
            <WinnerScreen
                handleRestart={handleRestart}
                pokemonAmount={pokemonAmount}
                points={points}
            />
        </>
    );
}

export default App;
