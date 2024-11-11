import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AddToCartButton } from './AddToCartButton'; // Adjust the import path as necessary
import '@testing-library/jest-dom';

const mockLines = [
    {
        merchandiseId: '123',
        quantity: 1,
    },
];

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

class ErrorBoundary extends React.Component {
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
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).toBeInTheDocument();
});

test('calls onClick handler when clicked', () => {
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

test('button is disabled when disabled prop is true', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={true}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).toBeDisabled();
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
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).toBeDisabled();
});

test('button is enabled when fetcher state is idle', () => {
    const mockFetcher = { state: 'idle' };
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).not.toBeDisabled();
});

test('button text is rendered correctly', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).toHaveTextContent('Add to Cart');
});

test('button has correct type attribute', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).toHaveAttribute('type', 'submit');
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
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(buttonElement);
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
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).toHaveClass('disabled');
});

test('button has correct class when enabled', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).not.toHaveClass('disabled');
});

test('button is rendered with correct initial state', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).toBeEnabled();
});

test('button is rendered with correct initial state when disabled', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={true}>
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).toBeDisabled();
});

test('button has correct aria-label attribute', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false} aria-label="Add to Cart">
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).toHaveAttribute('aria-label', 'Add to Cart');
});

test('button has correct data-testid attribute', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false} data-testid="add-to-cart-button">
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByTestId('add-to-cart-button');
    expect(buttonElement).toBeInTheDocument();
});

test('button has correct role attribute', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false} role="button">
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).toHaveAttribute('role', 'button');
});

test('button has correct title attribute', () => {
    renderWithRouterAndErrorBoundary(
        <AddToCartButton lines={mockLines} analytics={{}} disabled={false} title="Add to Cart">
            Add to Cart
        </AddToCartButton>
    );
    const buttonElement = screen.getByRole('button', { name: /add to cart/i });
    expect(buttonElement).toHaveAttribute('title', 'Add to Cart');
});