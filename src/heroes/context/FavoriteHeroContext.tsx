import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
    // State
    favorites: Hero[];
    favoriteCount: number;

    // Methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
    const [favorites, setFavorites] = useState<Hero[]>(
        getFavoritesFromLocalStorage()
    );

    const isFavorite = (hero: Hero) => favorites.some(heroAux => heroAux.id === hero.id);

    const toggleFavorite = (hero: Hero) => {
        const heroExists = favorites.find(heroAux => heroAux.id === hero.id);

        if (heroExists) {
            setFavorites(favorites.filter(heroAux => heroAux.id !== hero.id));
            return;
        }

        setFavorites([...favorites, hero]);
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])

    return (
        <FavoriteHeroContext
            value={{
                // State
                favorites,
                favoriteCount: favorites.length,

                // Methods
                isFavorite,
                toggleFavorite
            }}
        >
            {children}
        </FavoriteHeroContext >
    )
}