import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm }) {
    return (
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[200px] h-[50px] rounded-full pl-2 border-2 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    );
  }
  