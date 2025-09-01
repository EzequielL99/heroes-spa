import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";

export const SearchPage = () => {
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
        </>
    )
}

export default SearchPage;
