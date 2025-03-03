import { useState, useEffect } from "react";
import pokeball from "../assets/pokeball.svg";

function shuffleArray(array) {
    const newArray = [...array];
    for (var i = newArray.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }
    return newArray;
}

export default function PokemonCards({ setPoints, cardAmount, restartAmount }) {
    const [pokemons, setPokemons] = useState([]);
    const pokemonAmount = 1000;
    function handleCardClick(clickedPokemon) {
        return () => {
            if (!clickedPokemon.clicked) {
                setPoints((prev) => ++prev);
                setPokemons((prev) => {
                    const shufled = shuffleArray(prev);
                    return shufled.map((pokemon) => {
                        return pokemon.name === clickedPokemon.name
                            ? { ...pokemon, clicked: true }
                            : pokemon;
                    });
                });
            } else {
                setPokemons((prev) => {
                    const shufled = shuffleArray(prev);
                    return shufled.map((pokemon) => {
                        return { ...pokemon, clicked: false };
                    });
                });
                setPoints(0);
            }
        };
    }

    useEffect(() => {
        async function fetchData(id) {
            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
                );
                if (!response.ok)
                    throw new Error(`Response status: ${response.status}`);
                const json = await response.json();
                return {
                    id: id,
                    name: json.name,
                    sprite: json.sprites.other["official-artwork"]
                        .front_default,
                    clicked: false,
                };
            } catch (e) {
                console.error(
                    `Error while fetching pokemon ${id}:${e.message}`
                );
                throw e;
            }
        }

        async function FillPokemonArray() {
            const randomNumbers = new Set();
            while (randomNumbers.size < cardAmount) {
                randomNumbers.add(
                    Math.floor(Math.random() * pokemonAmount) + 1
                );
            }
            const promises = Array.from(randomNumbers).map((number) =>
                fetchData(number)
            );
            return await Promise.all(promises);
        }
        let active = true;
        FillPokemonArray()
            .then((result) => {
                if (active) setPokemons(result);
            })
            .catch((reject) => console.error(reject));
        return () => {
            active = false;
        };
    }, [cardAmount, restartAmount]);

    return (
        <>
            {pokemons.length !== 0 ? (
                <section className="pokemon-cards">
                    {pokemons.map((pokemon) => (
                        <div
                            className="pokemon-card"
                            key={pokemon.name}
                            onClick={handleCardClick(pokemon)}
                        >
                            <img src={pokemon.sprite} alt={pokemon.name} />
                            <p> {pokemon.name}</p>
                        </div>
                    ))}
                </section>
            ) : (
                <div className="loading-container">
                    <img src={pokeball} className="spinner"></img>
                </div>
            )}
        </>
    );
}
