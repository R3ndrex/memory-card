import { useState, useEffect } from "react";

export default function PokemonCards({ setPoints, pokemonAmount }) {
    const [pokemons, setPokemons] = useState([]);

    function handleCardClick(clickedPokemon) {
        if (!clickedPokemon.clicked) {
            setPoints((prev) => ++prev);
            setPokemons((prev) =>
                prev.map((pokemon) => {
                    return pokemon.name === clickedPokemon.name
                        ? { ...pokemon, clicked: true }
                        : pokemon;
                })
            );
        } else {
            setPokemons((prev) =>
                prev.map((pokemon) => {
                    return { ...pokemon, clicked: false };
                })
            );
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
                    sprite: json.sprites.front_default,
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
                const randomNumber = Math.floor(Math.random() * 100) + 1;
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
                    console.log(1);
                    setPokemons(resolve);
                }
            })
            .catch((reject) => console.error(reject));
        return () => {
            active = false;
        };
    }, [pokemonAmount]);
    return (
        <section className="pokemon-cards">
            {pokemons.map((pokemon) => (
                <div
                    className="pokemon-card"
                    key={pokemon.name}
                    onClick={() => handleCardClick(pokemon)}
                >
                    <img src={pokemon.sprite} alt={pokemon.name} />
                    <p> {pokemon.name}</p>
                </div>
            ))}
        </section>
    );
}
