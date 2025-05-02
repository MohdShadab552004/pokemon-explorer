import { useEffect, useState, useMemo, useCallback } from "react";
import PokemonCard from "./PokemonCard";

export default function FavoritesPage() {
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20;

  useEffect(() => {
    const favoriteList = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritePokemons(favoriteList);
  }, []);

  const totalPages = useMemo(() => Math.ceil(favoritePokemons.length / pokemonsPerPage), [favoritePokemons]);
  const indexOfLast = currentPage * pokemonsPerPage;
  const indexOfFirst = indexOfLast - pokemonsPerPage;

  const currentFavorites = useMemo(() => {
    return favoritePokemons.slice(indexOfFirst, indexOfLast);
  }, [favoritePokemons, indexOfFirst, indexOfLast]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  }, [currentPage, totalPages]);

  const handlePrev = useCallback(() => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  return (
    <div className="p-6 max-w-6xl min-h-[100vh] mx-auto bg-yellow-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Favorite Pokémon</h1>

      {currentFavorites.length === 0 ? (
        <p className="text-gray-600">You haven't favorited any Pokémon yet.</p>
      ) : (
        <>
          <div className="max-w-[1024px] m-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentFavorites.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
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
      )}
    </div>
  );
}
