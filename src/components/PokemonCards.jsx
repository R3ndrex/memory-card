import { useState, useEffect } from "react";

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

    function handleCardClick(clickedPokemon) {
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
                randomNumbers.add(Math.floor(Math.random() * 1000) + 1);
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
        <section className="pokemon-cards">
            {pokemons.map((pokemon) => (
                <div
                    className="pokemon-card"
                    key={pokemon.name}
                    onClick={() => {
                        handleCardClick(pokemon);
                    }}
                >
                    <img src={pokemon.sprite} alt={pokemon.name} />
                    <p> {pokemon.name}</p>
                </div>
            ))}
        </section>
    );
}
