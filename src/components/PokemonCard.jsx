import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { BiHeart, BiHeartCircle } from "react-icons/bi";

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

function PokemonCard({ pokemon }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // useCallback to memoize the handler
  const handleClick = useCallback(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const found = favorites.some((fav) => fav.id === pokemon.id);
    const updatedFavorites = found
      ? favorites.filter((p) => p.id !== pokemon.id)
      : [...favorites, pokemon];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!found);
  }, [pokemon]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const found = favorites.some((fav) => fav.id === pokemon.id);
    setIsFavorite(found);
  }, [pokemon.id]);

  // useMemo for memoizing type badge list
  const typeBadges = useMemo(
    () =>
      pokemon.types.map((type) => (
        <span
          key={type}
          className={`px-2 py-1 text-white text-xs rounded-full ${
            typeColors[type] || "bg-gray-300"
          }`}
        >
          {type}
        </span>
      )),
    [pokemon.types]
  );

  return (
    <div className="border-2 border-yellow-300 rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition">
      <div className="w-full flex items-center justify-between mb-4">
        <p className="text-gray-500">#{pokemon.id}</p>
        {isFavorite ? (
          <BiHeartCircle
            className="text-red-500 cursor-pointer"
            size={24}
            onClick={handleClick}
            title="Unfavorite"
          />
        ) : (
          <BiHeart
            className="text-red-400 cursor-pointer"
            size={24}
            onClick={handleClick}
            title="Add to favorites"
          />
        )}
      </div>
      <Link to={`/${pokemon.id}`} className="flex flex-col items-center">
        <img src={pokemon.sprite} alt={pokemon.name} className="w-24 h-24 mb-2" />
        <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
        <div className="flex flex-wrap gap-2 mt-2">{typeBadges}</div>
      </Link>
    </div>
  );
}

export default React.memo(PokemonCard);
