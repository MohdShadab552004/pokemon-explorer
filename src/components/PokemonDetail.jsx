import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BiHeart, BiHeartCircle } from "react-icons/bi";

export default function PokemonDetail() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [error, setError] = useState(null);
  const [isfav, setIsFav] = useState(false);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemon(res.data);

        const species = await axios.get(res.data.species.url);
        const evoRes = await axios.get(species.data.evolution_chain.url);
        const evoChain = extractEvolutionChain(evoRes.data.chain);
        setEvolution(evoChain);
      } catch (err) {
        setError("Failed to load Pokémon details.");
      }
    }

    fetchPokemonDetails();
  }, [pokemonId]);

  useEffect(() => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log(pokemonId);
    const found = existingFavorites.some(fav => fav.id == pokemonId);

  if (found) {
    setIsFav(true);
  } else {
    setIsFav(false);
  }  
  }, []);

  function extractEvolutionChain(chain) {
    const evo = [];
    let current = chain;
    while (current) {
      evo.push(current.species.name);
      current = current.evolves_to[0];
    }
    return evo;
  }

  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!pokemon) return <div className="text-center mt-10 text-xl">Loading...</div>;

  const handleClickAddFav = () => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFav = existingFavorites.some(fav => fav.id === pokemon.id);
    
    if (!isAlreadyFav) {
      const simplifiedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
        types: pokemon.types.map(t => t.type.name),
      }
      const updatedFavorites = [...existingFavorites, simplifiedPokemon];
      console.log(updatedFavorites, "updated favorites");
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFav(true);
    }
  };

  const handleClickRemFav = () => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = existingFavorites.filter(fav => fav.id !== pokemon.id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFav(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-yellow-100 to-red-100 rounded-xl shadow-lg mt-6 border border-yellow-400">
      <div>
        <Link to="/" className="text-blue-700 hover:underline text-sm font-semibold">&larr; Back to Pokédex</Link>
        {!isfav ? (
          <BiHeart
            className={`text-red-400 cursor-pointer float-right ${isfav ? 'hidden' : 'block'}`}
            size={24}
            onClick={handleClickAddFav}
            title="Add to Favorites"
          />
        ) : (
          <BiHeartCircle
            className={`text-red-400 cursor-pointer float-right ${isfav ? 'block' : 'hidden'}`}
            size={24}
            onClick={handleClickRemFav}
            title="Remove from Favorites"idden
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 mt-4">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-48 h-48 bg-white rounded-xl shadow-md border"
        />
        <div>
          <h1 className="text-4xl font-bold capitalize text-red-700">{pokemon.name}</h1>
          <div className="mt-3 flex gap-2">
            {pokemon.types.map(t => (
              <span key={t.type.name} className="bg-red-200 px-3 py-1 rounded-full text-sm font-semibold text-red-800 capitalize">
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-yellow-800 mb-3">Base Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {pokemon.stats.map(stat => (
            <div key={stat.stat.name} className="bg-yellow-200 p-3 rounded-lg font-medium capitalize shadow-sm">
              {stat.stat.name}: <span className="text-red-800 font-bold">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-yellow-800 mb-3">Abilities</h2>
        <ul className="flex flex-wrap gap-3">
          {pokemon.abilities.map(a => (
            <li key={a.ability.name} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full capitalize font-semibold shadow-sm">
              {a.ability.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-yellow-800 mb-3">Moves</h2>
        <div className="max-h-48 overflow-y-auto border border-yellow-300 rounded-lg p-3 bg-white shadow-sm">
          <ul className="columns-2 sm:columns-3 text-sm gap-2 space-y-1">
            {pokemon.moves.slice(0, 30).map(m => (
              <li key={m.move.name} className="capitalize">{m.move.name}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-yellow-800 mb-3">Evolution Chain</h2>
        <div className="flex flex-wrap gap-6">
          {evolution.map(name => (
            <div key={name} className="text-center">
              <img
                src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
                alt={name}
                className="w-20 h-20 mx-auto"
              />
              <p className="capitalize text-sm font-semibold mt-1">{name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
