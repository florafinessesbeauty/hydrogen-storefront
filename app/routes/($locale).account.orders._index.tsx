import { Link, useLoaderData, type MetaFunction } from '@remix-run/react';
import {
  Money,
  getPaginationVariables,
  flattenConnection,
} from '@shopify/hydrogen';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { CUSTOMER_ORDERS_QUERY } from '~/graphql/customer-account/CustomerOrdersQuery.server';
import type {
  CustomerOrdersFragment,
  OrderItemFragment,
} from '~/graphql/customer-account/customerAccountApi.generated';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';

export const meta: MetaFunction = () => {
  return [{ title: 'Orders' }];
};

export async function loader({ request, context }: LoaderFunctionArgs & { context: { customerAccount: { query: Function } } }) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const { data, errors } = await context.customerAccount.query(
    CUSTOMER_ORDERS_QUERY,
    {
      variables: {
        ...paginationVariables,
      },
    },
  );

  if (errors) {
    throw new Error(errors[0].message);
  }

  return json({
    orders: flattenConnection(data.customer.orders) as OrderItemFragment[],
  });
}

export default function Orders() {
  const { orders } = useLoaderData<{ orders: OrderItemFragment[] }>();

  return (
    <PaginatedResourceSection
      items={orders}
      renderItem={(order) => (
        <div key={order.id}>
          <Link to={`/account/orders/${order.id}`}>
            <h2>Order {order.name}</h2>
            <Money data={order.totalPriceV2} />
          </Link>
        </div>
      )}
    />
  );
}

// src/locales/en_index.tsx
import React from 'react';
import App from '../components/App';

const EnIndex: React.FC = () => {
  return (
    <div>
      <App />
    </div>
  );
};

export { EnIndex };
