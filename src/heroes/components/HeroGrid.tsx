import type { HeroesResponse } from "../types/get-heroes.response"
import { HeroGridCard } from "./HeroGridCard"

interface Props {
    heroes: HeroesResponse['heroes']
}

export const HeroGrid = ({ heroes }: Props) => {

    if (heroes.length === 0) return (
        <div>No hay personajes</div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Hero Card 1 - Superman */}

            {heroes.map(hero => (
                <HeroGridCard key={hero.id} hero={hero} />
            ))}
        </div>
    )
}
