import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetchPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("fetching data...");
        
        const res = await axios.get(import.meta.env.VITE_API_URI);
        console.log("fetch succesfull");
        
        const results = res.data.results;
        console.log("results", results);
        

        const detailedPromises = results.map(pokemon => axios.get(pokemon.url));
        const detailedResults = await Promise.all(detailedPromises);

        const formatted = detailedResults.map(p => ({
          id: p.data.id,
          name: p.data.name,
          sprite: p.data.sprites.front_default,
          types: p.data.types.map(t => t.type.name)
        }));

        setPokemons(formatted);

        // Get unique types
        const allTypes = new Set();
        formatted.forEach(p => p.types.forEach(t => allTypes.add(t)));
        setTypes(Array.from(allTypes).sort());

      } catch (err) {
        setError('Failed to load Pokémons.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { pokemons, types, loading, error };
}
