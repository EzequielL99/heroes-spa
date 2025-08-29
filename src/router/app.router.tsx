import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/hero/1',
        element: <HeroPage />
    },
    {
        path: '/admin',
        element: <AdminPage />
    }
]) 