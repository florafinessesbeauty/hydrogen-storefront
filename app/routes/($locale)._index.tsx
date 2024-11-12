import {defer} from '@shopify/remix-oxygen';
import { getPaginationVariables } from '~/utils/pagination.server';
import {Await, useLoaderData, Link, type V2_MetaFunction as MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from '~/storefrontapi.generated'; // Ensure this module exists or correct the path
import React from 'react';
// Removed duplicate import of ReactDOM
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from '~/components/App';
import { gql, useQuery } from '@apollo/client';
import { print } from 'graphql';
import { PageLayout } from '~/components/PageLayout';
import {
  Money,
  flattenConnection,
} from '@shopify/hydrogen';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { CUSTOMER_ORDERS_QUERY } from '~/graphql/customer-account/CustomerOrdersQuery.server';
import type {
  CustomerOrdersFragment,
  OrderItemFragment,
} from '~/graphql/customer-account/CustomerAccountApi.generated';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection.server';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

interface LoaderData {
  featuredCollection: FeaturedCollectionFragment;
  recommendedProducts: Promise<RecommendedProductsQuery | null>;
}

export async function loader(args: LoaderFunctionArgs): Promise<LoaderData> {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const { recommendedProducts: resolvedDeferredData } = await deferredData;

  return {
    featuredCollection: criticalData.featuredCollection,
    recommendedProducts: Promise.resolve(resolvedDeferredData as RecommendedProductsQuery | null),
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs & { context: { storefront: { query: (query: string) => Promise<RecommendedProductsQuery> } } }) {
  interface DeferredData {
    recommendedProducts: RecommendedProductsQuery | null;
  }

  function loadDeferredData({context}: LoaderFunctionArgs): Promise<DeferredData> {
    return context.storefront
      .query<RecommendedProductsQuery>(print(RECOMMENDED_PRODUCTS_QUERY))
      .then((recommendedProducts) => {
        return { recommendedProducts };
      })
      .catch((error) => {
        // Log query errors, but don't throw them so the page can still render
        console.error(error);
        return { recommendedProducts: null };
      });
  }
}

export function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <FeaturedCollection collection={data.featuredCollection} />
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={data.recommendedProducts as RecommendedProductsQuery}>
          {(resolvedProducts) => (
            <RecommendedProducts products={resolvedProducts.products.nodes.map(product => ({
              ...product,
              images: {
                nodes: product.images.nodes.map(image => ({
                  ...image,
                  id: image.id || '',
                  altText: image.altText || ''
                }))
              }
            })) || []} />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

interface RecommendedProductsProps {
  products: (Pick<Product, "id" | "title" | "handle"> & {
    priceRange: { minVariantPrice: Pick<MoneyV2, "currencyCode" | "amount"> };
    images: { nodes: { id: string; url: string; altText: string }[] };
  })[];
}

function RecommendedProducts({ products }: RecommendedProductsProps) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = gql`
  query RecommendedProducts($country: CountryCode, $language: LanguageCode) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        description
        images(first: 1) {
          edges {
            node {
              src
              altText
            }
          }
        }
      }
    }
  }
`;

const client = new ApolloClient({
  uri: 'https://your-graphql-endpoint.com/graphql',
  cache: new InMemoryCache(),
});

const HomePage: React.FC = () => {
  const { data, loading, error } = useQuery<RecommendedProductsQuery>(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {
      country: 'US',
      language: 'EN',
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <PageLayout>
      <h1>Recommended Products</h1>
      <div>
        {data?.products.nodes.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            {product.images.edges.map((image) => (
              <img key={image.node.src} src={image.node.src} alt={image.node.altText} />
            ))}
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default HomePage;

export const ordersMeta: MetaFunction = () => {
  return [{ title: 'Orders' }];
};

export async function ordersLoader({ request, context }: LoaderFunctionArgs & { context: { customerAccount: { query: Function } } }) {
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

export function Orders() {
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

// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from '~/components/MyComponent';

const App: React.FC = () => {
  return (
    <div>
      <MyComponent />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
