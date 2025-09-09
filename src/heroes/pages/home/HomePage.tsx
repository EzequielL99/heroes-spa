import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "../search/ui/SearchControls"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
// import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action"
// import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { useMemo } from "react"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"

export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'heroes', 'favorites', 'villains'];

        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab]);

    const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

    const { data: summary } = useHeroSummary();

    return (
        <>

            {/* Header */}
            <CustomJumbotron
                title="Universo de SuperHeroes"
                description="Descubre, explora y administra superheroes y villanos"
            />

            <CustomBreadcrumbs currentPage='Superheroes' />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and Searching */}
            <SearchControls />

            {/* Tabs */}
            <Tabs value={selectedTab} className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger
                        value="all"
                        onClick={() => setSearchParams(prev => {
                            prev.set('tab', 'all');
                            prev.set('category', 'all');
                            prev.set('page', '1');
                            return prev;
                        })}
                    >All Characters ({summary?.totalHeroes})</TabsTrigger>
                    <TabsTrigger
                        onClick={() => setSearchParams(prev => {
                            prev.set('tab', 'favorites');
                            return prev;
                        })}
                        value="favorites"
                        className="flex items-center gap-2"
                    >
                        Favorites (3)
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setSearchParams(prev => {
                            prev.set('tab', 'heroes');
                            prev.set('category', 'hero');
                            prev.set('page', '1');
                            return prev;
                        })}
                        value="heroes"
                    >Heroes ({summary?.heroCount})</TabsTrigger>
                    <TabsTrigger
                        onClick={() => setSearchParams(prev => {
                            prev.set('tab', 'villains');
                            prev.set('category', 'villain');
                            prev.set('page', '1');
                            return prev;
                        })}
                        value="villains"
                    >Villains ({summary?.villainCount})</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <h1>Todos</h1>
                    {/* Character Grid */}
                    <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                </TabsContent>
                <TabsContent value="favorites">
                    <h1>Favoritos</h1>
                    {/* <HeroGrid /> */}
                </TabsContent>
                <TabsContent value="heroes">
                    <h1>Heroes</h1>
                    <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    {/* <HeroGrid /> */}
                </TabsContent>
                <TabsContent value="villains">
                    <h1>Villanos</h1>
                    <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    {/* <HeroGrid /> */}
                </TabsContent>
            </Tabs>

            {/* Pagination */}
            <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
        </>
    )
}