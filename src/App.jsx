import PokemonCards from "./components/PokemonCards";
import "./App.css";
import { useState } from "react";

function App() {
    const [points, setPoints] = useState(0);
    const [restarts, setRestarts] = useState(0);
    const pokemonAmount = 10;

    return (
        <>
            <header>
                <h1>Pokemon Memory Game</h1>
                <nav>
                    <div> Points:{points} </div>
                    <div>Restarts:{restarts} </div>
                    <button onClick={() => setRestarts((prev) => ++prev)}>
                        Restart
                    </button>
                </nav>
            </header>
            <PokemonCards
                setPoints={setPoints}
                pokemonAmount={pokemonAmount}
                restartAmount={restarts}
            />
        </>
    );
}

export default App;
