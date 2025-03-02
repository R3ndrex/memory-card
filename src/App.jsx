import PokemonCards from "./components/PokemonCards";
import "./App.css";
import { useState } from "react";

function App() {
    const [points, setPoints] = useState(0);
    const pokemonAmount = 5;
    return (
        <>
            <header>
                <h1>Pokemon Memory Game</h1>
                <nav>
                    <div>Points:{points}</div>
                    <button>Restart</button>
                </nav>
            </header>
            <PokemonCards setPoints={setPoints} pokemonAmount={pokemonAmount} />
        </>
    );
}

export default App;
