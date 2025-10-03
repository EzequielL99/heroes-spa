import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";
import { MemoryRouter } from "react-router";

if (typeof window.ResizeObserver === 'undefined') {
    class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }
    window.ResizeObserver = ResizeObserver;
}

const renderWithRouter = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControls />
        </MemoryRouter>
    )
}

describe('SearchControls', () => {
    test('should render SearchControls with default values', () => {
        const { container } = renderWithRouter();
        expect(container).toMatchSnapshot();
    });

    test('should set input value when search param name is set', () => {
        renderWithRouter(['/?name=Batman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

        expect(input.getAttribute('value')).toBe('Batman');
    });

    test('should change params when input is changed and enter is pressed', () => {
        renderWithRouter(['/?name=Batman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

        expect(input.getAttribute('value')).toBe('Batman');

        fireEvent.change(input, { target: { value: 'Superman' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(input.getAttribute('value')).toBe('Superman');
    });

    test('should change params when when slider is changed', () => {
        renderWithRouter(['/?name=Batman']);

        const filterButton = screen.getByRole('button', {
            name: 'Filters'
        })

        fireEvent.click(filterButton);

        const slider = screen.getByRole('slider');
        expect(slider.getAttribute('aria-valuenow')).toBe('0');

        fireEvent.keyDown(slider, { key: 'ArrowRight' });
        expect(slider.getAttribute('aria-valuenow')).toBe('1');
    });

    test('should accordion to be open when toggleAccordion is changed', () => {
        renderWithRouter(['/?name=Batman']);

        const filterButton = screen.getByRole('button', {
            name: 'Filters'
        });

        fireEvent.click(filterButton);

        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');

        expect(accordionItem?.getAttribute('data-state')).toBe('open');
    });

    test('should accordion to be closed when filter button is pressed', () => {
        renderWithRouter(['/?name=Batman']);

        const filterButton = screen.getByRole('button', {
            name: 'Filters'
        });

        fireEvent.click(filterButton);
        
        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');
        
        expect(accordionItem?.getAttribute('data-state')).toBe('open');
        
        fireEvent.click(filterButton);
        expect(accordionItem?.getAttribute('data-state')).toBe('closed');
    });
})