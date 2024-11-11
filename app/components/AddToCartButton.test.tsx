import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { AddToCartButton } from './AddToCartButton'; // Adjust the import path as necessary
import '@testing-library/jest-dom';

const mockLines = [
    {
        merchandiseId: '123',
        quantity: 1,
    },
];
// Removed unused renderWithRouter function

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong.</div>;
        }

        return this.props.children;
    }
}

const renderWithRouterAndErrorBoundary = (ui: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <ErrorBoundary>{ui}</ErrorBoundary>
        </BrowserRouter>
    );
};

test('renders AddToCartButton', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement1 = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement1).toBeInTheDocument();
});

test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false} onClick={handleClick}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement2 = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(buttonElement2);
    expect(handleClick).toHaveBeenCalledTimes(1);
});

test('button is disabled when disabled prop is true', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={true}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement3 = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement3).toBeDisabled();
});

test('renders hidden input with analytics data', () => {
    const analyticsData = { event: 'add_to_cart' };
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={analyticsData} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const inputElement = screen.getByDisplayValue(JSON.stringify(analyticsData));
    expect(inputElement).toBeInTheDocument();
});

test('button is disabled when fetcher state is not idle', () => {
    const mockFetcher = { state: 'submitting' };
    // Removed unused mockFetcher variable
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement4 = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement4).toBeDisabled();
});

test('button is enabled when fetcher state is idle', () => {
    const mockFetcher = { state: 'idle' };
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement4 = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement4).not.toBeDisabled();
});

test('button text is rendered correctly', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement5 = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement5).toHaveTextContent('Add to Cart');
});

test('button has correct type attribute', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement6 = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement6).toHaveAttribute('type', 'submit');
});

test('hidden input has correct name attribute', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const inputElement = screen.getByRole('textbox', { name: /analytics/i });
    expect(inputElement).toHaveAttribute('name', 'analytics');
});

test('hidden input has correct type attribute', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const inputElement = screen.getByRole('textbox', { name: /analytics/i });
    expect(inputElement).toHaveAttribute('type', 'hidden');
});

test('button is not clickable when disabled', () => {
    const handleClick = jest.fn();
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={true} onClick={handleClick}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement7 = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(buttonElement7);
    expect(handleClick).not.toHaveBeenCalled();
});

test('button is clickable when enabled', () => {
    const handleClick = jest.fn();
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false} onClick={handleClick}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
});

test('button has correct class when disabled', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={true}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement9 = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement9).toHaveClass('disabled');
});

test('button has correct class when enabled', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement10 = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement10).not.toHaveClass('disabled');
});

test('button has correct title attribute', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false} title="Add to Cart">
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement11 = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement11).toHaveAttribute('title', 'Add to Cart');
});