import PokemonCard from './PokemonCard';

export default function PokemonList({ pokemons }) {
  if (pokemons.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No Pokémon found!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
