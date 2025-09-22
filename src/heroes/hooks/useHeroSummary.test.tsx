import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react'
import { useHeroSummary } from "./useHeroSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getSummaryAction } from "../actions/get-summary.action";
import type { SummaryInformationResponse } from "../types/summary-information.response";

const tanStackCustomProvider = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient} >{children}</QueryClientProvider>
    )
}

// MOCK de API
vi.mock('../actions/get-summary.action', () => ({
    getSummaryAction: vi.fn()
}));

const mockGetSummaryAction = vi.mocked(getSummaryAction);


describe('useHeroSummary', () => {
    /*
    test('should return the initial state', () => {
        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        });

        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.isError).toBeFalsy();
        expect(result.current.data).not.toBeDefined();
    });
    */

    test('should return success state with data when API call succeeds', async () => {
        const mockSummaryData = {
            totalHeroes: 10,
            strongestHero: {
                id: '1',
                name: 'Superman'
            },
            smartestHero: {
                id: '2',
                name: 'Batman'
            },
            heroCount: 18,
            villainCount: 7
        } as SummaryInformationResponse;

        mockGetSummaryAction.mockResolvedValue(mockSummaryData);

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.isError).toBe(false);
        expect(mockGetSummaryAction).toHaveBeenCalled();



        /*
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toStrictEqual({
            totalHeroes: expect.any(Number),
            strongestHero: {
                id: '1',
                name: 'Clark Kent',
                slug: 'clark-kent',
                alias: 'Superman',
                powers: expect.any(Array),
                description: expect.any(String),
                strength: expect.any(Number),
                intelligence: expect.any(Number),
                speed: expect.any(Number),
                durability: expect.any(Number),
                team: 'Liga de la Justicia',
                image: '1.jpeg',
                firstAppearance: '1938',
                status: 'Active',
                category: 'Hero',
                universe: 'DC'
            },
            smartestHero: {
                id: '2',
                name: 'Bruce Wayne',
                slug: 'bruce-wayne',
                alias: 'Batman',
                powers: expect.any(Array),
                description: expect.any(String),
                strength: expect.any(Number),
                intelligence: expect.any(Number),
                speed: expect.any(Number),
                durability: expect.any(Number),
                team: 'Liga de la Justicia',
                image: '2.jpeg',
                firstAppearance: '1939',
                status: 'Active',
                category: 'Hero',
                universe: 'DC'
            },
            heroCount: expect.any(Number),
            villainCount: expect.any(Number)
        });
        */
    });

    test('should return error state when API call fails', async () => {
        const mockError = new Error('Failed to fetch summary');
        mockGetSummaryAction.mockRejectedValue(mockError);

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider(),
        });

        // Generar Error
        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toBeDefined();
        expect(result.current.isLoading).toBe(false);
        expect(mockGetSummaryAction).toHaveBeenCalled();
        expect(result.current.error?.message).toBe('Failed to fetch summary');
    })
})