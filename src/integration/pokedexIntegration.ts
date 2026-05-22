import axios from "axios";
import { Pokemon } from "../types/pokemon"; // TODO : criar tipo Pokemon

const API_BASE_URL = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

// pega a lista de pokemons e depois pega os detalhes de cada um para retornar um array completo
export const getPokemons = async (limit = 151): Promise<Pokemon[]> => {
  const response = await API_BASE_URL.get(`/pokemon?limit=${limit}`);
  const list = response.data.results;

  // para cada pokemon da lista, pega os detalhes
  const detailedList = await Promise.all(
    list.map(async (pokemon: { url: string }) => {
      const detailRes = await API_BASE_URL.get(pokemon.url);
      const data = detailRes.data;

      // retorna um objeto formatado com os detalhes dos pokemons
      return {
        nome: data.name,
        index: data.id.toString().padStart(3, '0'),
        tipos: data.types.map((t: any) => t.type.name),
        imagem: data.sprites.front_default,
        poderes: data.stats.map((s: any) => ({
          nome: s.stat.name,
          forca: s.base_stat,
        })),
      };
    })
  );

  return detailedList;
};