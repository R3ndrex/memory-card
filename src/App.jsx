import PokemonCards from "./components/PokemonCards";
import WinnerScreen from "./components/WinnerScreen";
import "./App.css";
import { useState } from "react";

function App() {
    const [points, setPoints] = useState(0);
    const [restarts, setRestarts] = useState(0);
    const [pokemonAmount, setPokemonAmount] = useState(5);
    const handleRestart = () => {
        setRestarts((prev) => ++prev);
        setPoints(0);
    };

    return (
        <>
            <header>
                <h1>Pokemon Memory Game</h1>
                <nav>
                    <div>
                        {" "}
                        <div>{`Points: ${points}`}</div>
                        <div>{`Restarts: ${restarts}`} </div>
                    </div>

                    <div>
                        <label htmlFor="gamemode">Difficulty</label>
                        <select
                            id="gamemode"
                            onChange={({ target }) => {
                                setPokemonAmount(target.value);
                            }}
                            name="gamemode"
                        >
                            <option value={5}>Easy</option>
                            <option value={10}>Normal</option>
                            <option value={22}>Hard</option>
                        </select>
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
