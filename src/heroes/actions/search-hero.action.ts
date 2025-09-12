import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

interface Option {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export const searchHeroAction = async (queryParams: Option) => {
  const { data } = await heroApi.get<Hero[]>("/search", {
    params: queryParams,
  });

  const heroes = data.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));

  return heroes;
};
