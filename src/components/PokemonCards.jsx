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

export default function PokemonCards({
    setPoints,
    pokemonAmount,
    restartAmount,
}) {
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
                console.error(e.message);
            }
        }

        async function FillPokemonArray() {
            const newPokemons = [];
            let i = 0;
            while (i < pokemonAmount) {
                const randomNumber = Math.floor(Math.random() * 1000) + 1;
                if (
                    !newPokemons.some((pokemon) => pokemon.id === randomNumber)
                ) {
                    const result = await fetchData(randomNumber);
                    newPokemons.push(result);
                    i++;
                }
            }
            return newPokemons;
        }
        let active = true;
        FillPokemonArray()
            .then((resolve) => {
                if (active) {
                    setPokemons(resolve);
                }
            })
            .catch((reject) => console.error(reject));
        return () => {
            active = false;
        };
    }, [pokemonAmount, restartAmount]);

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
