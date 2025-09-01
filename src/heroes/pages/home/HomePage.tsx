import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "../search/ui/SearchControls"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useState } from "react"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"

export const HomePage = () => {
    const [activeTab, setActiveTab] = useState<
        'all' | 'favorites' | 'heroes' | 'villains'
    >('all');



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
            <Tabs value={activeTab} className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger
                        value="all"
                        onClick={() => setActiveTab('all')}
                    >All Characters (16)</TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab('favorites')}
                        value="favorites"
                        className="flex items-center gap-2"
                    >
                        Favorites (3)
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab('heroes')}
                        value="heroes"
                    >Heroes (12)</TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab('villains')}
                        value="villains"
                    >Villains (2)</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <h1>Todos</h1>
                    {/* Character Grid */}
                    <HeroGrid />
                </TabsContent>
                <TabsContent value="favorites">
                    <h1>Favoritos</h1>
                    <HeroGrid />
                </TabsContent>
                <TabsContent value="heroes">
                    <h1>Heroes</h1>
                    <HeroGrid />
                </TabsContent>
                <TabsContent value="villains">
                    <h1>Villanos</h1>
                    <HeroGrid />
                </TabsContent>
            </Tabs>

            {/* Pagination */}
            <CustomPagination totalPages={8} />
        </>
    )
}