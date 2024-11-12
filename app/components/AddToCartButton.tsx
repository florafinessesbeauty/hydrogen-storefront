import {type FetcherWithComponents} from '@remix-run/react';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import * as React from 'react';

interface LocalOptimisticCartLineInput {
    merchandiseId: string;
    quantity: number;
}

interface AddToCartButtonProps {
    lines: LocalOptimisticCartLineInput[];
    analytics?: unknown;
    disabled?: boolean;
    onClick?: () => void;
    title?: string; // Add the title prop here
    children?: React.ReactNode; // Add the children prop here
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    lines,
    analytics,
    disabled,
    onClick,
    title,
    children,
}) => {
    return (
        <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
            {(fetcher: FetcherWithComponents<any>) => (
                <>
                    <input
                        name="analytics"
                        type="hidden"
                        value={JSON.stringify(analytics)}
                    />
                    <button
                        type="submit"
                        onClick={onClick}
                        disabled={disabled ?? fetcher.state !== 'idle'}
                        title={title} // Use the title prop here
                    >
                        {children}
                    </button>
                </>
            )}
        </CartForm>
    );
};
