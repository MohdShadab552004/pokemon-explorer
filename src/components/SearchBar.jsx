import React,{useContext} from "react";
import PokemonContext from "../context/PokemonContext";

export default function SearchBar() {
  const {searchTerm, setSearchTerm} = useContext(PokemonContext);
    return (
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[200px] h-[50px] p-4 bg-white rounded-xl shadow-md border border-yellow-300"
      />
    );
  }
  