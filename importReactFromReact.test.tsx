import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Add this import
import { AddToCartButton } from './components/AddToCartButton'; // Adjust the import path as necessary
import '@testing-library/jest-dom';

const renderWithRouter = (ui: React.ReactElement, options?: any) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>, options);
};

describe('AddToCartButton', () => {
    it('renders the button', () => {
        renderWithRouter(<AddToCartButton />);
        const buttonElement = screen.getByRole('button', { name: /add to cart/i });
        expect(buttonElement).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = jest.fn();
        renderWithRouter(<AddToCartButton onClick={handleClick} />);
        const buttonElement = screen.getByRole('button', { name: /add to cart/i });
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('button is disabled when disabled prop is true', () => {
        renderWithRouter(<AddToCartButton disabled={true} />);
        const buttonElement = screen.getByRole('button', { name: /add to cart/i });
        expect(buttonElement).toBeDisabled();
    });

    it('renders hidden input with analytics data', () => {
        const analyticsData = { event: 'add_to_cart' };
        renderWithRouter(<AddToCartButton analyticsData={analyticsData} />);
        const inputElement = screen.getByDisplayValue(JSON.stringify(analyticsData));
        expect(inputElement).toBeInTheDocument();
    });

    it('button is disabled when fetcher state is not idle', () => {
        renderWithRouter(<AddToCartButton fetcherState="loading" />);
        const buttonElement = screen.getByRole('button', { name: /add to cart/i });
        expect(buttonElement).toBeDisabled();
    });

    it('button is enabled when fetcher state is idle', () => {
        renderWithRouter(<AddToCartButton fetcherState="idle" />);
        const buttonElement = screen.getByRole('button', { name: /add to cart/i });
        expect(buttonElement).not.toBeDisabled();
    });

    it('button text is rendered correctly', () => {
        renderWithRouter(<AddToCartButton />);
        const buttonElement = screen.getByRole('button', { name: /add to cart/i });
        expect(buttonElement).toHaveTextContent('Add to Cart');
    });

    it('button has correct type attribute', () => {
        renderWithRouter(<AddToCartButton />);
        const buttonElement = screen.getByRole('button', { name: /add to cart/i });
        expect(buttonElement).toHaveAttribute('type', 'submit');
    });

    it('hidden input has correct name attribute', () => {
        const analyticsData = { event: 'add_to_cart' };
        renderWithRouter(<AddToCartButton analyticsData={analyticsData} />);
        const inputElement = screen.getByRole('textbox', { name: /analytics/i });
        expect(inputElement).toHaveAttribute('name', 'analytics');
    });

    it('hidden input has correct type attribute', () => {
        const analyticsData = { event: 'add_to_cart' };
        renderWithRouter(<AddToCartButton analyticsData={analyticsData} />);
        const inputElement = screen.getByRole('textbox', { name: /analytics/i });
        expect(inputElement).toHaveAttribute('type', 'hidden');
    });

    it('button is not clickable when disabled', () => {
        const handleClick = jest.fn();
        renderWithRouter(<AddToCartButton disabled={true} onClick={handleClick} />);
        const buttonElement = screen.getByRole('button', { name: /add to cart/i });
        fireEvent.click(buttonElement);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('button is clickable when enabled', () => {
        const handleClick = jest.fn();
        renderWithRouter(<AddToCartButton onClick={handleClick} />);
        const buttonElement = screen.getByRole('button', { name: /add to cart/i });
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('button has correct class when disabled', () => {
        renderWithRouter(<AddToCartButton disabled={true} />);
        const buttonElement = screen.getByRole('button', { name: /add to cart/i });
        expect(buttonElement).toHaveClass('disabled');
    });

    it('button has correct class when enabled', () => {
        renderWithRouter(<AddToCartButton />);
        const buttonElement = screen.getByRole('button', { name: /add to cart/i });
        expect(buttonElement).not.toHaveClass('disabled');
    });

    it('button has correct title attribute', () => {
        renderWithRouter(<AddToCartButton />);
        const buttonElement = screen.getByRole('button', { name: /add to cart/i });
        expect(buttonElement).toHaveAttribute('title', 'Add to Cart');
    });
});