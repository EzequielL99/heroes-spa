import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { searchHeroAction } from "@/heroes/actions/search-hero.action";
import { HeroGrid } from "@/heroes/components/HeroGrid";

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParams = {
        name: searchParams.get('name') ?? '',
        strength: searchParams.get('strength') ?? ''
    }

    const { data: searchResults } = useQuery({
        queryKey: ['hero-search', {...queryParams}],
        queryFn: () => searchHeroAction(queryParams),
        staleTime: 1000 * 60 * 5, // 5 minutos 
    });

    return (
        <>
            {/* Header */}
            <CustomJumbotron
                title="Buscador de Superheroes"
            />

            <CustomBreadcrumbs
                currentPage="Buscador de personajes"
                breadcrumbs={[
                    { to: '/', label: 'Heroes' },
                    { to: '/', label: 'Villanos' }
                ]}
            />

            {/* Stats Dashboard */}
            <HeroStats />

            <SearchControls />

            {searchResults && (
                <HeroGrid heroes={searchResults} />
            )}
        </>
    )
}

export default SearchPage;
