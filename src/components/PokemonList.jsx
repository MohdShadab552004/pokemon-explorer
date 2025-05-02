import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

export default function PokemonList({ pokemons }) {
  const [currentPage, setCurrentPage] = useState(1);
  

  const pokemonsPerPage = 20;
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
  const indexOfLast = currentPage * pokemonsPerPage;
  const indexOfFirst = indexOfLast - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemons]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (pokemons.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No Pokémon found!
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {currentPokemons.map((pokemon) => (
          <div key={pokemon.id} className="relative">
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
