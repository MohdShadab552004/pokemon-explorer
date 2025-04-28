import { useState } from 'react';
import useFetchPokemons from './hooks/useFetchPokemons';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonList from './components/PokemonList';

export default function App() {
  const { pokemons, types, loading, error } = useFetchPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-yellow-100">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        types={types}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <main className="max-w-5xl mx-auto p-4">
        {loading && <div className="text-center mt-10 text-xl">Loading...</div>}
        {error && <div className="text-center mt-10 text-red-500">{error}</div>}
        {!loading && !error && <PokemonList pokemons={filteredPokemons} />}
      </main>
    </div>
  );
}
