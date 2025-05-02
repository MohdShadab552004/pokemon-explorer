import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PokemonContextProvider from './context/PokemonContextProvider';
import HomePage from './components/HomePage';
import PokemonDetail from './components/PokemonDetail';
import FavoritesPage from './components/FavoritesPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/:pokemonId",
      element: <PokemonDetail />
    },
    {
      path: "/favorites",
      element: <FavoritesPage />
    }
  ]);

  return (
    <PokemonContextProvider>
      <RouterProvider router={router} />
    </PokemonContextProvider>
  );
}

export default App;
