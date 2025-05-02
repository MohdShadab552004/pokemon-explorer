import React, { useState } from 'react';
import PokemonContext from './PokemonContext';
import useFetchPokemons from '../hooks/useFetchPokemons';

function PokemonContextProvider({ children }) {
  const { pokemons, types, loading, error } = useFetchPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        types,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        sortOption,
        setSortOption,
        selectedTypes,
        setSelectedTypes,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export default PokemonContextProvider;
