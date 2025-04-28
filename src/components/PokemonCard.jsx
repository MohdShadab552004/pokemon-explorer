import React from "react";

const typeColors = {
    fire: "bg-red-400",
    water: "bg-blue-400",
    grass: "bg-green-400",
    electric: "bg-yellow-400",
    bug: "bg-lime-400",
    normal: "bg-gray-400",
    poison: "bg-purple-400",
    ground: "bg-yellow-600",
    fairy: "bg-pink-400",
    fighting: "bg-orange-400",
    psychic: "bg-pink-600",
    rock: "bg-gray-600",
    ghost: "bg-indigo-600",
    ice: "bg-blue-200",
    dragon: "bg-indigo-500",
    dark: "bg-gray-700",
    steel: "bg-gray-500",
    flying: "bg-sky-300",
  };
  
  export default function PokemonCard({ pokemon }) {
    return (
      <div className="border-2 border-yellow-300 rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition">
        <p className="text-gray-500 w-full text-start">#{pokemon.id}</p>
        <img src={pokemon.sprite} alt={pokemon.name} className="w-24 h-24 mb-2" />
        <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-2 py-1 text-white text-xs rounded-full ${typeColors[type] || "bg-gray-300"}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    );
  }
  