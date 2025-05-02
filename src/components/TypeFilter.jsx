import React,{useContext} from 'react';
import PokemonContext from '../context/PokemonContext';

export default function SortOptions() {
  const {sortOption, setSortOption} = useContext(PokemonContext); 
  return (
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="w-[200px] h-[50px] bg-white rounded-xl shadow-md border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
    >
      <option value="">Sort By</option>
      <option value="id">By ID</option>
      <option value="name">By Name</option>
      <option value="a-z">Alphabetical (A-Z)</option>
      <option value="z-a">Alphabetical (Z-A)</option>
    </select>
  );
}
