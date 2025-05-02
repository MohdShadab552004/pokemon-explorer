import React, { useState, useContext, useMemo } from 'react';
import Header from './Header';
import PokemonList from './PokemonList';
import PokemonContext from '../context/PokemonContext';
import MultiTypeFilter from './MultiTypeFilter';

function HomePage() {
  const {
    pokemons,
    types,
    loading,
    error,
    searchTerm,
    sortOption
  } = useContext(PokemonContext);

  const [selectedTypes, setSelectedTypes] = useState([]);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTypes = selectedTypes.length > 0
        ? selectedTypes.some(type => pokemon.types.includes(type))
        : true;
      return matchesSearch && matchesTypes;
    });
  }, [pokemons, searchTerm, selectedTypes]);

  const sortedPokemons = useMemo(() => {
    return [...filteredPokemons].sort((a, b) => {
      if (sortOption === 'id') {
        return a.id - b.id;
      } else if (sortOption === 'name' || sortOption === 'a-z') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'z-a') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [filteredPokemons, sortOption]);

  return (
    <div className="min-h-screen bg-yellow-100">
      <Header />
      <main className="max-w-[1024px] mx-auto p-4">
        <MultiTypeFilter
          types={types}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
        {loading && <div className="text-center mt-10 text-xl">Loading...</div>}
        {error && <div className="text-center mt-10 text-red-500">{error}</div>}
        {!loading && !error && <PokemonList pokemons={sortedPokemons} />}
      </main>
    </div>
  );
}

export default HomePage;
